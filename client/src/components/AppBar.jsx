import React, { useContext } from "react";
import AuthAppBar from "./AuthAppBar";
import UserAppBar from "./UserAppBar";
import { AppContext } from "../contexts/AppContext";

export default function AppBar() {
    const {user, setUser} = useContext(AppContext);

    if (user != null) {
        return <UserAppBar />;
    }
    return <AuthAppBar />;
}
