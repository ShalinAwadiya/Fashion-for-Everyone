import { Alert, Avatar, Box, Button, CircularProgress, Grid, IconButton, InputBase, Paper, Snackbar, Stack, Typography } from "@mui/material";
import NavBar from "../../navbar/Navbar";
import { Container } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { user } from '../../../data';
import Table from "../table/table";

const PostBlog = () => {

    const navigate = useNavigate();

    const [snackOpen, setSnackOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const closeSnackbar = () => setSnackOpen(false);

    const onPost = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/fashion-blogs');
        }, 3000);
    }

    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Paper sx={{ p: 1.5, my: 1, alignContents: 'center', justifyItems: 'center', }}>
                    <Stack direction="column" spacing={3}>

                        {/* Row stack for profile picture and name */}
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                alt={user.name}
                                src={user.profile}
                                sx={{ width: 56, height: 56 }}
                            />
                            <Stack>
                                <Typography variant="h6" component="h6" sx={{ lineHeight: 1.2 }}>
                                    {user.name}
                                </Typography>
                            </Stack>
                        </Stack>

                        {/* Add product type and links */}
                        <Table />

                        {/* POST button */}
                        <Box sx={{ m: 1, display: 'flex', justifyItems: "center" }}>
                            <Button
                                variant="contained"
                                onClick={onPost}>
                                POST
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={styling.progress}
                                />
                            )}
                        </Box>
                    </Stack>

                    <Snackbar
                        open={snackOpen}
                        autoHideDuration={6000}
                        onClose={closeSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <Alert
                            onClose={closeSnackbar}
                            severity="success"
                            sx={{ width: '100%' }}
                            variant="filled"
                        >
                            {/* {`Post ${state?.post ? 'updated' : 'created'} successfully`} */}
                            Saved
                        </Alert>
                    </Snackbar>
                </Paper>
            </Container>
        </>
    )
};
const styling = {
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
    }
}
export default PostBlog;