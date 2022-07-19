
import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteIcon from "@mui/icons-material/Delete";
import AXIOS_CLIENT from "../../utils/apiClient";

class DeleteReview extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            reviewData: props.review_data
        };
    }

    toggle = () => {
        console.log("toggle called");
        this.setState({ modal: !this.state.modal })
        console.log(this.state);
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)

        AXIOS_CLIENT.delete('/reviews/delete/' + this.state.reviewData._id).then(res => {
            if (res.status === 200) {
                console.log('Product Deleted successfully!!!!')
                this.toggle();
                window.location.reload();
                console.log("task submited");
            }
        })
    }

    render() {
        return (
            <span>
                <DeleteIcon onClick={this.toggle} color="danger" style={{ marginLeft: '5px' }}></DeleteIcon>
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