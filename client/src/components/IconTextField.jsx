import React from "react";
import {TextField, InputAdornment} from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/system";

// const customTheme = createTheme({
//     components: {
//         MuiInput: {
//             input: {
//                 "&::placeholder": {
//                     color: "gray"
//                 },
//                 color: "white" // if you also want to change the color of the input, this is the prop you'd use
//             }
//         }
//     }
// });

const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
    return (
            <TextField 
                {...props} 
                InputProps={{
                    ...InputProps,
                    startAdornment: iconStart ? (
                    <InputAdornment position="start">{iconStart}</InputAdornment>
                    ) : null,
                    endAdornment: iconEnd ? (
                    <InputAdornment position="end">{iconEnd}</InputAdornment>
                    ) : null,
                }}
            />
    );
};

export default IconTextField;