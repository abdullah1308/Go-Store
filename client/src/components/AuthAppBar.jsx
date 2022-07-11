import { useState, useContext } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Stack,
    ButtonBase,
    Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import PersonIcon from "@mui/icons-material/Person";
import AuthModal from "./Auth/AuthModal";

export default function AuthAppBar() {
    const navigate = useNavigate();

    const {setOpenSignIn} = useContext(AppContext);
    const handleOpenSignIn = () => setOpenSignIn(true);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{ mx: 4 }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                        onClick={() => navigate("/")}
                    >
                        LOGO
                    </Typography>

                    {/* <ButtonBase
                        sx={{ textAlign: "left" }}
                        onClick={handleOpenSignIn}
                    >
                        <PersonIcon fontSize="large" />
                        <Stack p={1}>
                            <Typography variant="caption" component="p">
                                Welcome
                            </Typography>
                            <Typography variant="subtitle2" component="p">
                                Sign In / Register
                            </Typography>
                        </Stack>
                    </ButtonBase> */}
                    <Button color="inherit" variant="outlined" onClick={handleOpenSignIn}>Sign in / Sign Up</Button>
                    <AuthModal />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
