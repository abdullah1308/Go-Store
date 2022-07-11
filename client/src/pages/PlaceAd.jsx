import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Breadcrumbs,
    Link,
    Divider,
    TextField,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    FormLabel,
    MenuItem,
    FormHelperText,
    FormGroup,
    IconButton,
    Grid,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
    KeyboardArrowRight,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { AppContext } from "../contexts/AppContext";
import axios from "../axios.js";
import requests from "../request.js";

export default function PlaceAd() {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            if (user == null) {
                navigate("/");
            }
        }, 2000);

        setInterval(() => {
            if (user == null) {
                navigate("/");
            }
        }, 300000);
    }, []);

    const initialFormValues = {
        name: "",
        price: "",
        currency: "INR",
        category: "",
        sub_category: "",
        description: "",
        contact_num: "",
        city: "",
        country: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
        img6: "",
        img7: "",
        img8: "",
        user_id: "",
    };

    // Stores the image data
    const initialRefValues = {
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
        img6: "",
        img7: "",
        img8: "",
    };

    const categories = ["Electronics", "Books", "Sports", "Others"];
    const subCategories = [
        ["Mobiles and Tablets", "Computers and Laptops", "Home Appliances"],
        ["Textbooks", "Comics", "Novels"],
        ["Cricket", "Football", "Basketball"],
        [],
    ];

    const col1ImgID = [1, 2, 3, 4];
    const col2ImgID = [5, 6, 7, 8];

    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const imgRefs = useRef(initialRefValues);

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handleChange = (e) => {
        var { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFileChange = (e) => {
        var { name } = e.target;
        console.log(name)

        getBase64(e.target.files[0])
            .then((data) => {
                console.log(data);
                imgRefs.current[name] = data;
                setFormValues({
                    ...formValues,
                    [name]: e.target.files[0].name,
                });
            })
            .catch((err) => {
                console.log(err);
                setFormValues({ ...formValues, [name]: "" });
            });
    };

    useEffect(() => {
        setFormValues({ ...formValues, sub_category: "" });
    }, [formValues.category]);

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Item name is required!";
        } else if (values.name.length < 3 || values.name.length > 45) {
            errors.name = "Item name must be between 3 and 45 characters!";
        }

        let price = parseFloat(values.price);
        if (!values.price) {
            errors.price = "Price is required!";
        } else if (isNaN(price)) {
            errors.price = "Price must be a number!";
        } else if (price <= 0) {
            errors.price = "Price must be greater than or equal to 0!";
        }

        if (!values.category) {
            errors.category = "Category is required!";
        }

        if (!values.sub_category) {
            errors.sub_category = "Sub Category is required!";
        }

        if (!values.city) {
            errors.city = "City is required!";
        }

        if (!values.country) {
            errors.country = "Country is required!";
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setLoading(true);
    };

    useEffect(() => {
        if (loading === true && Object.keys(formErrors).length === 0) {
            const formData = JSON.parse(JSON.stringify(formValues));
            Object.keys(formData).forEach(k => formData[k] = formData[k].trim());
            console.log(imgRefs.current.img5);
            axios
                .post(requests.create_ad, {

                    ...formData,
                    price: parseFloat(formValues.price),
                    img1: imgRefs.current.img1,
                    img2: imgRefs.current.img2,
                    img3: imgRefs.current.img3,
                    img4: imgRefs.current.img4,
                    img5: imgRefs.current.img5,
                    img6: imgRefs.current.img6,
                    img7: imgRefs.current.img7,
                    img8: imgRefs.current.img8,
                    user_id: user.user.user_id,
                },
                    {headers: {Authorization: `Bearer ${user.token}`}}
                )
                .then((res) => {
                    setLoading(false);
                    navigate("/");
                })
                .catch((err) => {
                    setLoading(false);
                    if(err.message === "Network Error") {
                        setFormErrors({helper: "Network error!"});
                    } else {
                        setFormErrors({
                            helper: "Something went wrong! Please try again later.",
                        });
                        console.log(err);
                        console.log(user.token);
                    }
                });
        } else if (loading === true && Object.keys(formErrors).length > 0) {
            setLoading(false);
        }
    }, [loading, formValues, formErrors, user, navigate]);

    return (
        <Box sx={{ bgcolor: "#DCDCDC" }}>
            <Container maxWidth="md" sx={{ py: 2, border: 0, bgcolor: "#FFF" }}>
                <Typography variant="h5" component="h2">
                    Place a Free Ad
                </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        MUI
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Core
                    </Link>
                    <Typography color="text.primary">Breadcrumbs</Typography>
                </Breadcrumbs>

                <Divider sx={{ bgcolor: "#000", mt: 2 }} />

                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <FormHelperText sx={{ m: 0, mt: 2}}>
                            Fields with * are required
                        </FormHelperText>

                        <TextField
                            name="name"
                            label="Item Name"
                            placeholder="Item Name"
                            onChange={handleChange}
                            value={formValues.name}
                            error={"name" in formErrors}
                            helperText={formErrors.name}
                            sx={{ mt: 1 }}
                            variant="outlined"
                            required
                        />

                        <TextField
                            name="price"
                            label="Price"
                            placeholder="Price"
                            onChange={handleChange}
                            value={formValues.price}
                            error={"price" in formErrors}
                            helperText={formErrors.price}
                            sx={{ mt: 3 }}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 0 }}
                            required
                        />

                        <FormLabel
                            component="label"
                            htmlFor="currency"
                            sx={{ mt: 3 }}
                            required
                        >
                            Currency
                        </FormLabel>

                        <RadioGroup
                            name="currency"
                            aria-label="currency"
                            onChange={handleChange}
                            value={formValues.currency}
                        >
                            <FormControlLabel
                                value="INR"
                                control={<Radio />}
                                label="&#8377;"
                            />
                            <FormControlLabel
                                value="USD"
                                control={<Radio />}
                                label="&#36;"
                            />
                        </RadioGroup>

                        <TextField
                            name="category"
                            label="Category"
                            onChange={handleChange}
                            value={formValues.category}
                            error={"category" in formErrors}
                            helperText={formErrors.category}
                            sx={{ mt: 2 }}
                            required
                            select
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            name="sub_category"
                            label="Sub Category"
                            onChange={handleChange}
                            value={formValues.sub_category}
                            error={"sub_category" in formErrors}
                            helperText={formErrors.sub_category}
                            sx={{ mt: 3 }}
                            required
                            select
                        >
                            {formValues.category !== "" &&
                                subCategories[
                                    categories.indexOf(formValues.category)
                                ].map((subcategory, index) => (
                                    <MenuItem key={index} value={subcategory}>
                                        {subcategory}
                                    </MenuItem>
                                ))}

                            <MenuItem value="Others">Others</MenuItem>
                        </TextField>

                        <TextField
                            name="description"
                            label="Description"
                            placeholder="Description"
                            onChange={handleChange}
                            value={formValues.description}
                            sx={{ mt: 3 }}
                            variant="outlined"
                            multiline
                            rows={8}
                        />

                        <TextField
                            name="contact_num"
                            label="Contact Number"
                            placeholder="Contact Number"
                            onChange={handleChange}
                            value={formValues.contact_num}
                            sx={{ mt: 3 }}
                            variant="outlined"
                        />

                        <TextField
                            name="city"
                            label="City"
                            placeholder="City"
                            onChange={handleChange}
                            value={formValues.city}
                            error={"city" in formErrors}
                            helperText={formErrors.city}
                            sx={{ mt: 3 }}
                            required
                            variant="outlined"
                        />

                        <TextField
                            name="country"
                            label="Country"
                            placeholder="Country"
                            onChange={handleChange}
                            value={formValues.country}
                            error={"country" in formErrors}
                            helperText={formErrors.country}
                            sx={{ mt: 3 }}
                            required
                            variant="outlined"
                        />

                        <Grid container>
                            <Grid item xs={12} sm={6} style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                                {col1ImgID.map((imgID, index) => {
                                    let name = "img" + imgID;
                                    return (
                                        <Box key={index}>
                                            <FormLabel
                                                sx={{ mt: 3, display: "block" }}
                                            >
                                                Product Image {imgID}
                                            </FormLabel>
                                            <FormGroup row sx={{ mt: 2 }}>
                                                <label  htmlFor={name}>
                                                    <input
                                                        name={name}
                                                        id={name}
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                        type="file"
                                                        accept="image/*"
                                                        hidden
                                                    />
                                                    <IconButton
                                                        variant="contained"
                                                        component="span"
                                                        sx={{ p: 1 }}
                                                    >
                                                        <AddAPhotoIcon color="primary" />
                                                    </IconButton>
                                                </label>

                                                <TextField
                                                    label="File Uploaded"
                                                    placeholder="No file chosen"
                                                    value={formValues[name]}
                                                    size="small"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    sx={{ ml: 2 }}
                                                />
                                            </FormGroup>
                                        </Box>
                                    );
                                })}
                            </Grid>

                            <Grid item xs={12} sm={6} style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                            {col2ImgID.map((imgID, index) => {
                                    let name = "img" + imgID;
                                    return (
                                        <Box key={index}>
                                            <FormLabel
                                                sx={{ mt: 3, display: "block" }}
                                            >
                                                Product Image {imgID}
                                            </FormLabel>
                                            <FormGroup row sx={{ mt: 2 }}>
                                                <label  htmlFor={name}>
                                                    <input
                                                        name={name}
                                                        id={name}
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                        type="file"
                                                        accept="image/*"
                                                        hidden
                                                    />
                                                    <IconButton
                                                        variant="contained"
                                                        component="span"
                                                        sx={{ p: 1 }}
                                                    >
                                                        <AddAPhotoIcon color="primary" />
                                                    </IconButton>
                                                </label>

                                                <TextField
                                                    label="File Uploaded"
                                                    placeholder="No file chosen"
                                                    value={formValues[name]}
                                                    size="small"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    sx={{ ml: 2 }}
                                                />
                                            </FormGroup>
                                        </Box>
                                    );
                                })}
                            </Grid>
                        </Grid>
                        
                        <Typography variant="body2" component="p" textAlign="center" mt={3} color="red"
                            children={formErrors.helper ? formErrors.helper : ' '}
                        />
                        
                        <Box textAlign="center" sx={{ mt: 2 }}>
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                endIcon={<KeyboardArrowRight />}
                                loading={loading}
                            >
                                Publish
                            </LoadingButton>
                        </Box>
                    </FormControl>
                </form>
            </Container>
        </Box>
    );
}
