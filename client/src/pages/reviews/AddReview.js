import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TextField from '@mui/material/TextField';
import { Rating } from 'react-simple-star-rating'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AddReview extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            product_name: props.product_name,
            review_description: '',
            rating: '',
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
        if (this.state.review_description === "" || this.state.rating === "") {
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
        console.log("change handler")
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleRating = (rate) => {
        this.state.rating=rate;
        console.log("change rating"+ this.state.rating);
    }

    render(){
        return(
            <span>
                <Button size="sm" color="primary" onClick={this.toggle}>Add Review</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Review for {this.state.product_name}</ModalHeader>
                    <ModalBody>
                        <p>Review Score</p>
                        <Rating onClick={this.handleRating} ratingValue={this.state.rating} /* Available Props */></Rating>
                        <hr></hr>

                        <TextField
                            error={this.state.review_description === ""}
                            helperText={this.state.review_description === "" && "review message required"}
                            required
                            fullWidth
                            id="review_description"
                            label="Review Message"
                            name="review_description"
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                        <Button color="success" onClick={this.onSubmit}>Add Review</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}