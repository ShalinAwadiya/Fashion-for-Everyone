
import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import AXIOS_CLIENT from "../../utils/apiClient";
import { toast } from "react-toastify";

class DeleteModal extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = props.product_data
    }

    toggle = () => {
        console.log("toggle called");
        this.setState({ modal: !this.state.modal })
        console.log(this.state);
    }

    onSubmit = (event) => {
        event.preventDefault();

        AXIOS_CLIENT.delete('/products/delete/' + this.state._id).then(res => {
            if (res.status === 200) {
                console.log('Product Deleted successfully!!!!')
                this.toggle();
                window.location.reload();
                console.log("Deleted");
            }
        })
    }

    render() {
        return (
            <span>
                <Button size="sm" color="danger" onClick={this.toggle}>Delete</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Delete Product</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete Product <b>{this.state.name}</b></p>
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