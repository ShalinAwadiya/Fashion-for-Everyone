import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TextField from '@mui/material/TextField';
import { Rating } from 'react-simple-star-rating'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaRegEdit} from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';
import AXIOS_CLIENT from "../../utils/apiClient";

export default class EditReview extends React.Component{

    constructor(props)
    {
        super(props);
        console.log(props)
        this.state={
            product_name: props.product_name,
            review_data: props.review_data,
            review_description: props.review_data.reviewMessage,
            rating: (props.review_data.reviewScore/5) * 100,
            modal:false,
            isFormInvalid: false,
            server_response: ''
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


            const formData= {
                user_id: this.state.review_data.userId,
                product_id: this.state.review_data.productId,
                reviewMessage: this.state.review_description,
                reviewScore: this.state.rating/20
            }
            console.log('posting formdata', formData);

            AXIOS_CLIENT.put('/reviews/update/'+ this.state.review_data._id, formData)
                .then((res) => {
                    console.log('review submitted response=',res.data)
                    if(res.data.message){
                        this.toggle();
                        window.location.reload();
                    }
                }).catch((error) => {
                if( error.response ){
                    console.log(error.response.data.message);
                    this.setState({server_response: error.response.data.message});
                }
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
                <FaRegEdit onClick={this.toggle} style={{marginLeft :'20px' }}></FaRegEdit>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Review for {this.state.product_name}</ModalHeader>
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
                            value={this.state.review_description}
                            onChange={this.myChangeHandler}
                        />
                        <hr></hr>

                         <p style={{ color: 'red' }}>{this.state.server_response}</p>
                        <hr></hr>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                        <Button color="success" onClick={this.onSubmit}>Save Review</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}