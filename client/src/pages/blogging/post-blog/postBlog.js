//Author: Minal Rameshchandra Khona (B00873733)
import { Alert, Avatar, Box, Button, CircularProgress, Paper, Snackbar, Stack, Typography } from "@mui/material";
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
            <Container maxWidth="sm">
                <Stack direction="column" spacing={3}>
                    {/* Add product type and links */}
                    <Table />
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