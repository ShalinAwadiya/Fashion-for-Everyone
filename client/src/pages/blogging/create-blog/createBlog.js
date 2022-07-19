//Author: Minal Rameshchandra Khona (B00873733)
import { Avatar, Box, Button, Grid, IconButton, InputBase, Paper, Stack, Typography } from "@mui/material";
import { user } from '../../../data';
import { useEffect, useRef, useState } from "react";
import { DeleteRounded, ImageRounded } from "@mui/icons-material";
import PostBlog from '../post-blog/postBlog';

import { useNavigate } from "react-router-dom";
import './styles.css'
import { Container } from "@mui/system";
import { getUserId } from "../../../utils/firebase";
import AXIOS_CLIENT from "../../../utils/apiClient";
import { toast } from "react-toastify";
import Table from "../table/table";
import axios from "axios";

const CreateBlog = () => {
    const fileInput = useRef(null);
    const textInput = useRef(null);

    const navigate = useNavigate();

    //Image Upload
    const [image, setImage] = useState(null);
    const [base64, setBase64] = useState(null);

    const onImageSelect = (e) => {
        if (e.target.files) {
            let reader = new FileReader();

            reader.readAsDataURL(e.target.files[0]);

            reader.onload = () => {
                setBase64(reader.result);
                setImage(reader.result);
            };
        }
    }

    const onImageChange = () => {
        if (fileInput.current != null) {
            fileInput.current.click();
        }
    }

    const onDeleteImage = () => {
        setImage(null);
        setBase64(null);
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

    const [user, setUser] = useState({});

    useEffect(() => {
        AXIOS_CLIENT.get('/users').then((res) => {
            console.log(res);
            if (res) {
                console.log(res.data)
                setUser(res.data)
            }
        }).catch(err => {
            console.error(err);
            toast.error("Something went wrong!");
        });
    }, []);

    // Add Products table
    const [rows, setRows] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleAdd = () => {
        setRows([
            ...rows,
            {
                id: rows.length + 1,
                ProductType: "",
                ProductLink: ""
            },
        ]);
        setEdit(true);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...rows];
        list[index][name] = value;
        setRows(list);
    };

    const handleSave = () => {
        setEdit(!isEdit);
        setRows(rows);
        console.log("saved : ", rows);
    };

    const handleEdit = () => {
        setEdit(!isEdit);
    };

    const handleConfirm = () => {
        setShowConfirm(true);
    };

    const handleRemoveClick = (i) => {
        const list = [...rows];
        list.splice(i, 1);
        setRows(list);
        setShowConfirm(false);
    };

    const handleNo = () => {
        setShowConfirm(false);
    };

    //Blog Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        let productsArr = [];

        rows.map((row) => {
            productsArr.push(row);
        });

        const req = {
            blogId: user.name + Date.now(),
            userId: user.user_id,
            name: user.name,
            caption: data.get('caption'),
            image: [base64],
            products: productsArr
        }

        console.log(req);

        AXIOS_CLIENT.post('/blogs/post-blog', req)
            .then((res) => {
                console.log('Blog: ', res);
                if (res.status === 200) {
                    console.log('Blog posted successfully!!!')
                    navigate("/fashion-blogs", { state: { success: true } });
                }
            }).catch(err => {
                console.error(err);
                toast.error("Something went wrong!");
            });
    }

    return (
        <>
            <Container maxWidth="sm">
                <Paper sx={{ p: 1.5, my: 1, alignContents: 'center', justifyItems: 'center', }}>
                    <Stack direction="column" spacing={3}>
                        {/* Row stack for profile picture and name */}
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                alt={user?.name}
                                src={user?.profile}
                                sx={{ width: 56, height: 56 }}
                            />
                            <Stack>
                                <Typography variant="h6" component="h6" sx={{ lineHeight: 1.2 }}>
                                    {user.name}
                                </Typography>
                            </Stack>
                        </Stack>

                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {/* Caption input field */}
                            <InputBase
                                inputRef={textInput}
                                onChange={onTextFill}
                                minRows={4}
                                maxRows={10}
                                fullWidth={true}
                                multiline={true}
                                name="caption"
                                placeholder={'Caption'}
                                sx={{ mt: '30px', fontSize: 20 }}
                            />

                            {/* Display selected Images if any*/}
                            {image != null &&
                                <Box className="img-list">
                                    <div className="img-container">
                                        <img
                                            className="img"
                                            src={image}
                                            width="200"
                                            height="200"
                                        />
                                        <IconButton
                                            sx={styling.btnDelete}
                                            onClick={() => onDeleteImage(image)}
                                        >
                                            <DeleteRounded />
                                        </IconButton>
                                    </div>
                                </Box>
                            }

                            {/* Image Upload */}
                            <Stack direction="row" sx={styling.btnContainer}>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    ref={fileInput}
                                    onChange={onImageSelect}
                                />

                                <IconButton onClick={onImageChange}>
                                    <ImageRounded fontSize="medium" />
                                </IconButton>
                            </Stack>

                            <hr />

                            {/* Add Products */}
                            <Typography variant="body2" textAlign={'center'}>
                                ADD PRODUCTS
                            </Typography>

                            <Box>
                                <Table
                                    handleAdd={handleAdd}
                                    handleEdit={handleEdit}
                                    handleInputChange={handleInputChange}
                                    handleSave={handleSave}
                                    handleConfirm={handleConfirm}
                                    handleRemoveClick={handleRemoveClick}
                                    showConfirm={showConfirm}
                                    handleNo={handleNo}
                                    rows={rows}
                                    isEdit={isEdit}
                                />
                            </Box>

                            {/* Post Blog */}
                            <Box sx={{ m: 1, position: 'relative' }}>
                                <Button
                                    variant="contained"
                                    disabled={(image === null && !textFilled)}
                                    type={"submit"}>
                                    POST
                                </Button>
                            </Box>
                        </form>
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