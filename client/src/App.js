import { Box } from "@mui/material";
import "./App.css";
import UserAppBar from "./components/UserAppBar";
import AuthAppBar from "./components/AuthAppBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import List from "./pages/List";
import ProductCard from "./components/ProductCard";
import Product from "./pages/Product";
import PlaceAd from "./pages/PlaceAd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import AppBar from "./components/AppBar";
import { AppContext } from "./contexts/AppContext";
import axios from "./axios";
import requests from "./request";

function App() {
    const [user, setUser] = useState(null);
    const [openSignIn, setOpenSignIn] = useState(false);

    const refreshToken = () => {
        axios
            .get(requests.refresh)
            .then((res) => {
                setTimeout(() => {
                    refreshToken();
                }, res.data.expires_in - 2000);

                setUser({
                    user: res.data.user,
                    token: res.data.token,
                });
            })
            .catch((err) => {
                // console.log(err);
                setUser(null);
            });
    };
    
    useEffect(() => {
        refreshToken()
        console.log("i fire once")
    }, [])

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            {/* {   user !== null && */}
                <Router>
                    <AppContext.Provider value={{ user, setUser, openSignIn, setOpenSignIn}}>
                        <AppBar />
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route exact path="/list" element={<List />} />
                            <Route exact path="/placeAd" element={<PlaceAd />} />
                            <Route exact path="/product" element={<Product />} />
                        </Routes>
                    </AppContext.Provider>
                    <Footer />
                </Router>
            {/* } */}
        </Box>
    );
}

export default App;
