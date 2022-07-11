import {
    Box,
    Typography,
    Grid,
    Avatar,
    FormControl,
    FormHelperText,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import axios from "../../axios.js";
import requests from "../../request.js";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const avatarStyle = { backgroundColor: "#1bbd7e" };

function Signup(props) {
    const { changeTab } = props;

    const initialFormValues = { first_name: "", last_name: "", email: "", password: "", confirm_password: "" };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        var { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value.trim() });
    };

    const validate = (values) => {
        const errors = {};
        var emailReg = /\S+@\S+\.\S+/;
        
        if(!values.first_name) {
            errors.first_name = "First name is required!";
        } else if (values.first_name.length < 2 || values.first_name.length > 100) {
            errors.first_name = "First name must be between 2 and 100 characters!";
        }

        if(!values.last_name) {
            errors.last_name = "Last name is required!";
        } else if(values.last_name.length < 2 || values.last_name.length > 100) {
            errors.last_name = "Last name must be between 2 and 100 characters!";
        }

        if (!values.email) {
            errors.email = "Email is required!";
        } else if(!emailReg.test(values.email)) {
            errors.email = "Enter a valid email!"
        }
        
        if(!values.password) {
            errors.password = "Password is required!";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters!";
        }

        if(values.confirm_password !== values.password) {
            errors.confirm_password = "Passwords do not match!";
        }

        return errors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setLoading(true);
    };

    useEffect(() => {
        if(loading === true && Object.keys(formErrors).length === 0) {
            axios
                .post(requests.signup, formValues)
                .then((res) => {
                    setLoading(false);
                    changeTab(1);
                })
                .catch((err) => {
                    setLoading(false);
                    if(err.message === "Network Error") {
                        setFormErrors({helper: "Network error!"});
                    } else {
                        setFormErrors({
                            helper: err.response.data.error,
                        });
                    }
                })
        } else if(loading === true && Object.keys(formErrors).length > 0) {
            setLoading(false);
        }
    }, [loading, formValues, formErrors, changeTab]);

    return (
        <Box sx={{ p: 3 }}>
            <Grid align="center">
                <Avatar style={avatarStyle}>
                    <AddCircleOutlineOutlinedIcon />
                </Avatar>
                <Typography variant="h6" component="h2">
                    Sign Up
                </Typography>
                <Typography variant='caption'>Please fill this form to create an account !</Typography>
            </Grid>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField
                        name="first_name"
                        label="First Name"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={formValues.first_name}
                        error={"first_name" in formErrors}
                        helperText={formErrors.first_name}
                        sx={{ mt: 2 }}
                        required
                        size="small"
                    />
                    <TextField
                        name="last_name"
                        label="Last Name"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={formValues.last_name}
                        error={"last_name" in formErrors}
                        helperText={formErrors.last_name}
                        sx={{ mt: 2 }}
                        required
                        size="small"
                    />
                    <TextField
                        name="email"
                        label="Email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formValues.email}
                        error={"email" in formErrors}
                        helperText={formErrors.email}
                        sx={{ mt: 2 }}
                        required
                        size="small"
                    />
                    <TextField
                        name="password"
                        label="Password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formValues.password}
                        error={"password" in formErrors}
                        helperText={formErrors.password}
                        sx={{ mt: 2 }}
                        required
                        type="password"
                        size="small"
                    />
                    <TextField
                        name="confirm_password"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        value={formValues.confirm_password}
                        error={"confirm_password" in formErrors}
                        helperText={formErrors.confirm_password}
                        sx={{ mt: 2 }}
                        required
                        type="password"
                        size="small"
                    />

                    <FormHelperText
                        sx={{ m: 0, color: "red", mt: 1 }}
                        children={formErrors.helper ? formErrors.helper : " "}
                    />

                    <Box textAlign="center">
                    <LoadingButton
                        sx={{ mt: 1, display: "inline-block"}}
                        variant="contained"
                        type="submit"
                        loading={loading}
                    >
                        Sign Up
                    </LoadingButton>
                    </Box>
                </FormControl>
            </form>
        </Box>
    );
}

export default Signup;
