import { Box, Container, Typography, Breadcrumbs, Link, Divider, Stack, Button, ImageList, ImageListItem } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';

export default function List() {
    return (
        <>
            <Box sx={{bgcolor: "#F8F8F8"}}>
                <Container maxWidth="md" sx={{py: 2, border: 0, bgcolor: "#FFF"}}>
                    <Typography variant="h4" component="h2">Product Name 123456789Product Name 123456789</Typography>
                    <Breadcrumbs aria-label="breadcrumb" sx={{mt: 1}}>
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
                    <Stack spacing={1} sx={{mt: 4}}>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1" component="p"><b>From:</b></Typography>
                            <Typography variant="body1" component="p">Abdullah Rafi</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1" component="p"><b>Price:</b></Typography>
                            <Typography variant="body1" component="p">10000</Typography>
                            <Typography variant="body1" component="p">INR</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1" component="p"><b>Date:</b></Typography>
                            <Typography variant="body1" component="p">Friday, April 22, 2022</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1" component="p"><b>Category:</b></Typography>
                            <Typography variant="body1" component="p">Books</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1" component="p"><b>Location:</b></Typography>
                            <Typography variant="body1" component="p">Chennai, Tamil Nadu</Typography>
                        </Stack>
                    
                    </Stack>

                    <Button variant="contained" startIcon={<PhoneIcon />} sx={{p: 1, mt: 2}}>1234567890</Button>

                    <Typography variant="body1" component="p" sx={{mt: 2}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui dignissimos quae architecto? Saepe, fuga! Voluptas illo optio neque illum enim aliquid ratione labore nostrum eius odit est voluptates, itaque voluptate blanditiis! Laborum voluptatem dolor itaque et mollitia nostrum fugit impedit qui placeat, commodi dolorum sint cupiditate laudantium dolores. Voluptatibus veritatis quos ipsam quae aut magnam sequi, amet odio obcaecati quod qui iste libero recusandae adipisci. Illum sunt excepturi, voluptate fugit iusto in debitis cupiditate eaque. Ipsum ullam ducimus consequatur corrupti nihil, dolores inventore obcaecati voluptatibus aliquid, accusantium beatae est? Eum reiciendis consequatur temporibus cupiditate veniam aliquam, fugit voluptatem ipsam numquam deleniti, est hic eius at sunt facilis a, optio exercitationem nihil eaque earum? Quisquam consequuntur earum reprehenderit. Aut in maiores vel blanditiis deserunt, aliquid quos, eius fuga, dicta cupiditate nisi? Vero nam voluptas eum necessitatibus tempore ipsa recusandae voluptatum placeat, aut possimus architecto deserunt doloremque quo laboriosam iste itaque incidunt amet suscipit. Optio fuga soluta eaque ipsum magni numquam distinctio pariatur fugit eius necessitatibus! Illum repellendus velit nesciunt minima temporibus eos quidem, harum nam ipsa enim. Illum qui non dolor quod aperiam natus cumque, quia eos veritatis. Dolore libero praesentium, eum tempore quod deserunt distinctio provident id atque voluptate dolores?</Typography>
                    
                    <ImageList variant="masonry" cols={3} gap={8} sx={{m: 3, }}>
                        {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                            />
                        </ImageListItem>
                        ))}
                    </ImageList>


                </Container>
            </Box>
        </>
    );
}

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
    },
  ];