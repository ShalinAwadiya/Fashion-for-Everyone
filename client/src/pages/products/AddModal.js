
import React from 'react';
import {Modal, Button, ModalHeader, ModalBody, ModalFooter, Toast} from 'reactstrap';
import TextField from '@mui/material/TextField';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import 'bootstrap/dist/css/bootstrap.min.css';
import AXIOS_CLIENT from "../../utils/apiClient";

class AddModal extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            name: '',
            brand: '',
            price: 0,
            description: '',
            img: null,
            base64: null,
            modal:false,
            isFormInvalid: false
        };
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

    toggle = () =>{
        console.log("toggle called");
        this.setState({modal: !this.state.modal})
        console.log(this.state);
    }

    validate = () => {
        console.log("validate called")
        if (this.state.name === "" || this.state.brand === "" || this.state.description === "" || this.state.price===0 || this.state.img===null) {
            console.log("invalidate")
            this.state.isFormInvalid = true;
            console.log(this.state)
        } else {
            this.state.isFormInvalid = false;
            console.log('submitting product'+ this.state);
            AXIOS_CLIENT.post('/products/add-product', this.state)
                .then((res) => {
                    console.log('Product addition result', res);
                    if (res.status === 200) {
                        console.log('product posted successfully!!!')
                    }
                }).catch(err => {
                console.error(err);
                Toast.error("Something went wrong!");
            }).then(data =>{
                    this.toggle();
                    window.location.reload();
            });

            console.log("task submited");
        }
      };
    
    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        this.validate();
    }

    myChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
 
    render(){
        return(
            <span>
                {/*<Button size="sm" color="primary" onClick={this.toggle}>Add Product</Button>*/}
                <AddCircleTwoToneIcon  onClick={this.toggle}></AddCircleTwoToneIcon >
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>  
                    <ModalBody>
                        <TextField
                        error={this.state.name === ""}
                        helperText={this.state.name === "" && "product name required"}
                        required
                        fullWidth
                        id="lastName"
                        label="Name"
                        name="name"
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
                        onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <TextField
                            error={this.state.brand === ""}
                            helperText={this.state.brand === "" && "product brand required"}
                            required
                            fullWidth
                            id="Product brand"
                            label="Product brand"
                            name="brand"
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <TextField
                            error={this.state.price === 0}
                            helperText={this.state.price === 0 && "product price required"}
                            required
                            fullWidth
                            name="price"
                            label="Product Price"
                            type="number"
                            id="price"
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <label for="img">Select Product Image: </label>
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
                        <Button color="success" onClick={this.onSubmit}>Add Product</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}

export default AddModal;