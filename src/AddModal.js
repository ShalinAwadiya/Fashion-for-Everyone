
import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TextField from '@mui/material/TextField';

import 'bootstrap/dist/css/bootstrap.min.css';

class AddModal extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            product_name: '',
            product_description: '',
            price: '',
            modal:false,
            isFormInvalid: false
        };
    }
    
    toggle = () =>{
        console.log("toggle called");
        this.setState({modal: !this.state.modal})
        console.log(this.state);
    }

    validate = () => {
        console.log("validate called")
        if (this.state.product_name == "" || this.state.product_description == "" || this.state.price == "") {
            console.log("invalidate")
            this.state.isFormInvalid = true;
            console.log(this.state)
        } else {
            this.state.isFormInvalid = false;
            this.toggle();
            window.location.reload();
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
                <Button size="sm" color="primary" onClick={this.toggle}>Add Product</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>  
                    <ModalBody>
                        <TextField
                        error={this.state.product_name === ""}
                        helperText={this.state.product_name === "" && "product name required"}
                        required
                        fullWidth
                        id="lastName"
                        label="Product Name"
                        name="product_name"
                        onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <TextField
                        error={this.state.product_description === ""}
                        helperText={this.state.product_description === "" && "product description required"}
                        required
                        fullWidth
                        id="Product Description"
                        label="Product Description"
                        name="product_description"
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
                        id="Product Price"
                        onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                        <label for="img">Select Product Image: </label>
                        <input className="pull-right"type="file" id="img" name="img" accept="image/*"/>


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