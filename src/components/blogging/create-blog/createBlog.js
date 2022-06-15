import { Alert, Avatar, Box, Button, Grid, IconButton, InputBase, Paper, Snackbar, Stack, Typography } from "@mui/material";
import NavBar from "../../navbar/Navbar";
import { user } from '../../../data';
import { useRef, useState } from "react";
import { DeleteRounded, ImageRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import './styles.css'
import { Container } from "@mui/system";

const CreateBlog = () => {

    const fileInput = useRef(null);
    const textInput = useRef(null);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const onImageSelect = (e) => {
        if (e.target.files) {
            const fileList = e.target.files
            const newImages = [];
            let lastId = images.length;

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const url = URL.createObjectURL(file);
                const id = lastId + 1;
                newImages.push(url);
                lastId = id;
            }
            setImages((oldImages) => [...oldImages, ...newImages]);
        }
    }

    const onImageChange = () => {
        if (fileInput.current != null) {
            fileInput.current.click();
        }
    }

    const onDeleteImage = (url) => {
        const filteredImages = images.filter((image) => image != url);
        setImages(filteredImages);
    }

    const onNext = () => {
        navigate('/fashion-blogs/post')
    }

    const [textFilled, setTextFilled] = useState(false);
    const onTextFill = (text) => {
        if (text != '' && !textFilled) {
            setTextFilled(true);
        }
        else if (text === '' && textFilled) {
            setTextFilled(false);
        }
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

                        {/* Caption input field */}
                        <InputBase
                            inputRef={textInput}
                            onChange={onTextFill}
                            minRows={5}
                            maxRows={10}
                            fullWidth={true}
                            multiline={true}
                            placeholder={'Caption'}
                            sx={{ mt: '30px', fontSize: 20 }}
                        />

                        {/* Display selected Images if any*/}
                        {images.length > 0 &&
                            <Box className="img-list">
                                {images.map((image, index) =>
                                    <div className="img-container" key={index + ''}>
                                        <img
                                            className="img"
                                            src={image}
                                            width="200"
                                            height="200"
                                        />
                                        <IconButton
                                            sx={styling.btnDelete}
                                            onClick={() => onDeleteImage(image)}
                                            disabled={loading}
                                        >
                                            <DeleteRounded />
                                        </IconButton>
                                    </div>
                                )}
                            </Box>
                        }

                        <Stack direction="row" sx={styling.btnContainer}>
                            {/* Image upload */}
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                style={{ display: 'none' }}
                                ref={fileInput}
                                onChange={onImageSelect}
                            />

                            <IconButton onClick={onImageChange} disabled={loading}>
                                <ImageRounded fontSize="medium" />
                            </IconButton>

                            {/* NEXT button */}
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Button
                                    variant="contained"
                                    disabled={(images.length == 0 && !textFilled) || loading}
                                    onClick={onNext}>
                                    NEXT
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </>
    )
};

const styling = {
    btnDelete: {
        position: 'absolute',
        top: '2%',
        right: '2%',
        backgroundColor: 'lightgrey'
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
    },
    btnContainer: {
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}
export default CreateBlog;