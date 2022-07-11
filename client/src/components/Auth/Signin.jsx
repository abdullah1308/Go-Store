import {
    Box,
    Typography,
    Grid,
    Avatar,
    FormControl,
    FormHelperText,
    TextField,
    Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState, useEffect, useContext } from "react";
import axios from "../../axios.js";
import requests from "../../request.js";
import { AppContext } from "../../contexts/AppContext";

const avatarStyle = { backgroundColor: "#1bbd7e" };

function Signin(props) {
    const { changeTab, closeModal } = props;

    const initialFormValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const { user, setUser } = useContext(AppContext);

    const handleChange = (e) => {
        var { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value.trim() });
    };

    const validate = (values) => {
        const errors = {};
        var emailReg = /\S+@\S+\.\S+/;

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!emailReg.test(values.email)) {
            errors.email = "Enter a valid email!";
        }

        if (!values.password) {
            errors.password = "Password is required!";
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
            axios
                .post(requests.login, formValues)
                .then((res) => {
                    setLoading(false);
                    setUser({
                        user: res.data.user,
                        accessToken: res.data.token,
                    });
                    closeModal();
                })
                .catch((err) => {
                    setLoading(false);
                    if(err.message === "Network Error") {
                        setFormErrors({helper: "Network error!"});
                    } else {
                        setFormErrors({
                            helper: "Invalid email or password!",
                        });
                    }
                });
        } else if (loading === true && Object.keys(formErrors).length > 0) {
            setLoading(false);
        }
    }, [loading, formValues, formErrors, setUser, closeModal]);

    return (
        <Box sx={{ p: 3 }}>
            <Grid align="center">
                <Avatar style={avatarStyle}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h6" component="h2">
                    Sign In
                </Typography>
            </Grid>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField
                        name="email"
                        label="Email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formValues.email}
                        error={"email" in formErrors}
                        helperText={formErrors.email}
                        sx={{ mt: 2 }}
                        size="small"
                        required
                    />
                    <TextField
                        name="password"
                        label="Password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={formValues.password}
                        error={"password" in formErrors}
                        helperText={formErrors.password}
                        type="password"
                        sx={{ mt: 3 }}
                        size="small"
                        required
                    />

                    <FormHelperText
                        sx={{ m: 0, color: "red", mt: 1 }}
                        children={formErrors.helper ? formErrors.helper : " "}
                    />

                    <Box textAlign="center">
                        <LoadingButton
                            sx={{ mt: 1, display: "inline-block" }}
                            variant="contained"
                            type="submit"
                            loading={loading}
                        >
                            Sign In
                        </LoadingButton>
                    </Box>
                </FormControl>
            </form>

            <Typography variant="body2" component="p" textAlign="center" mt={2}>
                Don't have an account?{" "}
                <Link underline="hover" onClick={changeTab}>
                    Sign Up
                </Link>
            </Typography>
        </Box>
    );
}

export default Signin;
