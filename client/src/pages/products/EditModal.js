
import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter, Toast} from 'reactstrap';
import TextField from '@mui/material/TextField';

import 'bootstrap/dist/css/bootstrap.min.css';
import AXIOS_CLIENT from "../../utils/apiClient";

class EditModal extends React.Component{

    constructor(props) {
        super(props);
        this.state=props.product_data;
    }

    toggle = () =>{
        console.log("toggle called");
        this.setState({modal: !this.state.modal})
        console.log(this.state);
    }

    validate = () => {
        console.log("validate called")
        if (this.state.name === "" || this.state.description === "" || this.state.price === "" || this.state.brand==="") {
            console.log("invalidate")
            this.state.isFormInvalid = true;
            console.log(this.state)
        } else {
            this.state.isFormInvalid = false;

            //make put call
            delete this.state['imageUrl'];
            console.log(this.state);

            AXIOS_CLIENT.put('/products/update/'+this.state._id, this.state)
                .then((res) => {
                    console.log('Product addition result', res);
                    if (res.status === 200) {
                        console.log('product updated successfully!!!')
                    }
            }).catch(err => {
                console.error(err);
                Toast.error("Something went wrong!");
            }).then(data =>{
                this.toggle();
                window.location.reload();
            });
        }
    };

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)

        this.validate();
    }

    imageUpload = (e) => {
        if (e.target.files) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = () => {
                this.setState({base64: reader.result});
                this.setState({img: reader.result});
            };
        }
        console.log("state after upload is", this.state)
    }

    myChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        return(
            <span>
                <Button size="sm" color="primary" onClick={this.toggle}>Edit</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Product</ModalHeader>
                    <ModalBody>
                        <TextField
                            error={this.state.name === ""}
                            helperText={this.state.name === "" && "product name required"}
                            required
                            fullWidth
                            id="lastName"
                            label="Product Name"
                            name="name"
                            value = {this.state.name}
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <TextField
                            error={this.state.description === ""}
                            helperText={this.state.description === "" && "product description required"}
                            required
                            fullWidth
                            id="Product Description"
                            label="Product Description"
                            name="description"
                            value = {this.state.description}
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <TextField
                            error={this.state.brand === ""}
                            helperText={this.state.brand === "" && "product brand required"}
                            required
                            fullWidth
                            id="Product Brand"
                            label="Product Brand"
                            name="brand"
                            value = {this.state.brand}
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <TextField
                            error={this.state.price === ""}
                            helperText={this.state.price === "" && "product price required"}
                            required
                            fullWidth
                            name="price"
                            label="Product Price"
                            type="number"
                            id="price"
                            value = {this.state.price}
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <label htmlFor="img">Select Product Image: </label>
                        <input
                            className="pull-right"
                            type="file"
                            accept="image/*"
                            name="img"
                            id="img"
                            required
                            onChange={this.imageUpload}
                        />


                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                        <Button color="success" onClick={this.onSubmit}>Update Product</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}

export default EditModal;