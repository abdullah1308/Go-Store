import { Divider, Container, Grid, Stack, Typography, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function Footer() {
    return (
        <footer style={{marginTop: "auto"}}>
            <Box mt={3} px={{xs: 3, sm: 10}} py={{xs: 5, sm: 10}} bgcolor="grey" color="white">
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link href="#" color="inherit">FAQ</Link>
                            </Box>
                            <Box>
                                <Link href="#" color="inherit">Contact</Link>
                            </Box>
                            <Box>
                                <Link href="#" color="inherit">Support</Link>
                            </Box>
                            <Box>
                                <Link href="#" color="inherit">Privacy Policy</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link href="#" color="inherit">FAQ</Link>
                            </Box>
                            <Box>
                                <Link href="#" color="inherit">Contact</Link>
                            </Box>
                            <Box>
                                <Link href="#" color="inherit">Support</Link>
                            </Box>
                            <Box>
                                <Link href="#" color="inherit">Privacy Policy</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link href="#" color="inherit">FAQ</Link>
                            </Box>
                            <Box>
                                <Link href="#" color="inherit">Contact</Link>
                            </Box>
                            <Box>
                                <Link href="#" color="inherit">Support</Link>
                            </Box>
                            <Box>
                                <Link href="#" color="inherit">Privacy Policy</Link>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={{xs: 5, sm: 10}} pb={{xs: 5, sm: 0}}>
                        Website &reg; 2021
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}