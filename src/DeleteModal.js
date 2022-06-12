
import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class DeleteModal extends React.Component{

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
                <Button size="sm" color="danger" onClick={this.toggle}>Delete</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Delete Product</ModalHeader>  
                    <ModalBody>
                        <p>Are you sure you want to delete Product <b>{this.state.productName}</b></p>
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

export default DeleteModal;