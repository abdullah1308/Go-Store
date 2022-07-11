import { Container, Typography, Link, Breadcrumbs, Divider, Grid, Autocomplete, FormControl, FormGroup, FormControlLabel, Checkbox, Button, Select, MenuItem} from "@mui/material";
import { Box } from "@mui/system";
import ProductCard from "../components/ProductCard"
import React from "react";
import IconTextField from "../components/IconTextField";
import SearchIcon from '@mui/icons-material/Search';


export default function List() {
    return (
        <Box sx={{bgcolor: "#F8F8F8"}}>
            <Container maxWidth="md" sx={{py: 2, border: 0, bgcolor: "#FFF"}}>
                <Typography variant="h5" component="h2"> Search Results </Typography>
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
                
                <Divider sx={{bgcolor: "#000", mt: 2}}/>

                <Box sx={{mt: 4, p: 2, bgcolor: "#EEEEEE", borderRadius: '10px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5}>
                            <Autocomplete
                                sx={{backgroundColor: "white", borderRadius: "5px"}}
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                                renderInput={(params) => (
                                    <>
                                        <IconTextField
                                            iconStart={<SearchIcon />}
                                            {...params}
                                            placeholder="Search for"                                        
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    </>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Select
                                    sx={{backgroundColor: "white", borderRadius: "5px", width: "100%"}}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    renderValue={() => "All Categories"}
                                >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                                <FormGroup sx={{mt: 1}}>
                                    <FormControlLabel control={<Checkbox/>} label="Has Pic" />
                                </FormGroup>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant="contained" sx={{width: "100%", p: 1}}>Search</Button>
                        </Grid>
                    </Grid>
                </Box>

                <FormControl sx={{mt: 2, minWidth: 100 }} size="small">
                    <Select
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        renderValue={() => "Publish Date Desc"}
                                    >
                                    <MenuItem value={10}>Publish Date Desc</MenuItem>
                                    <MenuItem value={20}>Publish Date Asc</MenuItem>
                    </Select>
                </FormControl>

                <Grid container spacing={2} mt={1} align="center">
                    <Grid item xs={12} sm={6} lg={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <ProductCard />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <ProductCard />
                    </Grid>
                </Grid>
                
                <Box textAlign='center' sx={{mt: 3}}>
                    <Button variant='contained'>
                        Load More
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}