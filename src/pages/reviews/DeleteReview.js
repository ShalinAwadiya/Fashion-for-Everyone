
import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from "@mui/icons-material/Delete";

class DeleteReview extends React.Component{

    constructor(props)
    {
        super(props);
        console.log(props);
        this.state={productName: props.productName};
    }

    toggle = () =>{
        console.log("toggle called");
        this.setState({modal: !this.state.modal})
        console.log(this.state);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        this.toggle();
        window.location.reload();
        console.log("task submited");
    }

    render(){
        return(
            <span>
                 <DeleteIcon onClick={this.toggle} color="danger" style={{marginLeft :'5px' }}></DeleteIcon>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Delete Review</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete Review</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                        <Button color="danger" onClick={this.onSubmit}>Delete</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}

export default DeleteReview;