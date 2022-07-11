import {useContext} from "react";
import { Box, Container, Typography, Grid, Autocomplete, Button, TextField, Select, MenuItem, FormControl, Stack, Paper} from "@mui/material";
import IconTextField from "../components/IconTextField";
import banner from "../assets/images/website-banner3.jpg";
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { border } from "@mui/system";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function Home() {
    const {user, setUser, setOpenSignIn} = useContext(AppContext);
    const navigate = useNavigate();

    const handlePlaceAd = () => {
        if(user != null) {
            navigate("/placeAd");
        } else {
            setOpenSignIn(true);
        }
    }
    return (
        <>
            <Box sx={{backgroundImage: `url(${banner})`, p: 8, backgroundColor: alpha("#000", 0.5)}}>
                    <Container sx={{backgroundColor: alpha("#fff", 0.5), p: 3}} maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}> 
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
                                            placeholder="I'm looking for..."                                        
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    </>
                                )}
                            />
                            </Grid>
                            <Grid item xs={12} md={3}> 
                                <Select
                                    sx={{backgroundColor: "white", borderRadius: "5px", width: "100%"}}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    renderValue={() => "All Categories"}
                                >
                                    <MenuItem value=''>
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={3}> 
                            <Autocomplete
                                sx={{backgroundColor: "white", borderRadius: "5px"}}
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                                renderInput={(params) => (
                                    <>
                                        <IconTextField
                                            iconStart={<LocationOnIcon color="grey"/>}
                                            {...params}
                                            placeholder="Location"                                        
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    </>
                                )}
                            />
                            </Grid>
                            <Grid item xs={12} md={3}> 
                                <Button variant="contained" sx={{width: "100%", mt: 1, p: 1}}>Search</Button>
                            </Grid>
                        </Grid>
                    </Container>
            </Box>

            <Container maxWidth="lg" sx={{backgroundColor: "#fff", mt: 5}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <Typography variant="body1" component="p"> 
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus ex, dolore consequuntur corporis debitis vero dolor dolores. Perferendis, cum temporibus.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button variant="contained" sx={{width: "100%"}} onClick={handlePlaceAd}>Place an Ad</Button>
                    </Grid>
                </Grid>

                <Typography variant="h6" component="h2" sx={{my: 2}}> Browse by Category </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={0}>
                            <Accordion defaultExpanded sx={{border: 3}}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Accordion 1</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack spacing={2}>
                                            <Item>Item 1</Item>
                                            <Item>Item 2</Item>
                                            <Item>Item 3</Item>
                                            <Item>Item 4</Item>
                                            <Item>Item 5</Item>
                                            <Item>Item 6</Item>
                                        </Stack>
                                    </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={0}>
                            <Accordion sx={{border: 3}}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Accordion 2</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack spacing={2}>
                                            <Item>Item 1</Item>
                                            <Item>Item 2</Item>
                                            <Item>Item 3</Item>
                                        </Stack>
                                    </AccordionDetails>
                            </Accordion>
                            <Accordion sx={{border: 3}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Accordion 3</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={2}>
                                        <Item>Item 1</Item>
                                        <Item>Item 2</Item>
                                        <Item>Item 3</Item>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded sx={{border: 3}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Accordion 4</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={2}>
                                        <Item>Item 1</Item>
                                        <Item>Item 2</Item>
                                        <Item>Item 3</Item>
                                        <Item>Item 4</Item>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Stack direction="column" spacing={0}>
                        <Accordion defaultExpanded sx={{border: 3}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Accordion 5</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={2}>
                                        <Item>Item 1</Item>
                                        <Item>Item 2</Item>
                                        <Item>Item 3</Item>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded sx={{border: 3}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Accordion 6</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={2}>
                                        <Item>Item 1</Item>
                                        <Item>Item 2</Item>
                                        <Item>Item 3</Item>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}