import { Card, CardActions, CardContent, CardMedia, Typography, Box, CardActionArea } from "@mui/material";
import product from "../assets/images/product.jpg";
import {styled} from "@mui/material/styles";

const TextBox = styled(Box)(() => ({
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden"
}));

export default function ListItem() {
    return(
        <>
            <Card sx={{maxWidth: 345}} elevation={4}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="194"
                        image={product}
                    />
                    <CardActions sx={{mx: 1}}>
                        <Typography variant="h6" component="p">$</Typography>
                        <Typography variant="h6" component="p">100</Typography>
                    </CardActions>
                    <CardContent sx={{pt: 0}}>
                        <Typography variant="body2" noWrap component="p">I have a few very good books I want to sell. Pricing is negotiable. Can be picked up at any time from 5pm to 10pm from Monday to Friday</Typography>
                    </CardContent>
                    <CardActions sx={{mx: 1, display: "flex", justifyContent: "space-between"}} disableSpacing>
                        <Typography variant="caption" component="p">Chennai, Tamil Nadu</Typography>
                        <Typography variant="caption" component="p">April 03, 2022</Typography>
                    </CardActions>
                </CardActionArea>
            </Card>
        </>
    );
}