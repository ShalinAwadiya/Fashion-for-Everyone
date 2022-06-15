import * as React from 'react';
import { Button, Fab, Grid, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Navbar from "../navbar/Navbar";
import BlogList from "./blog-list/blogList";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const Fashion = () => {

    const navigate = useNavigate();

    const pages = ['Create Post', 'Following'];
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <Navbar />
            <Fab
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
                color="primary" aria-label="add"
                onClick={() => (
                    navigate('/fashion/createPost')
                )}>
                <AddIcon />
            </Fab>

            <Container maxWidth="sm">
                <BlogList />
            </Container>
        </>
    );
};
export default Fashion;