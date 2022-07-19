import React from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import TextField from '@mui/material/TextField';
import { Rating } from 'react-simple-star-rating'
import 'bootstrap/dist/css/bootstrap.min.css';
import AXIOS_CLIENT from "../../utils/apiClient";

export default class AddReview extends React.Component{

    constructor(props)
    {
        super(props);
        console.log('props from ', props);
        this.state={
            product_id: props.product_id,
            product: {},
            product_name: '',
            review_description: '',
            rating: '',
            modal:false,
            isFormInvalid: false,
            server_response: ''
        };
    }

    componentDidMount() {
        AXIOS_CLIENT.get('/products/' + this.state.product_id).then(res=> {
            console.log(res.data.product);
            this.setState({product: res.data.product, product_name: res.data.product.name})
        });
    }

    toggle = () =>{
        this.setState({modal: !this.state.modal})
    }

    validate = () => {
        console.log("validate called")
        if (this.state.review_description === "" || this.state.rating === "") {
            console.log("invalidate")
            this.state.isFormInvalid = true;
            console.log(this.state)
        } else {
            this.state.isFormInvalid = false;

            //add review
            const formData= {
                user_id: localStorage.getItem('userId'),
                product_id: this.state.product_id,
                reviewMessage: this.state.review_description,
                reviewScore: this.state.rating
            }
            console.log('posting review with data', formData);
            AXIOS_CLIENT.post('/reviews/add-review', formData)
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
        console.log("change handler", event.target.name)
        console.log('state before change', this.state)
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log('state agfet change', this.state)
    }

    handleRating = (rate) => {
        this.state.rating=rate/20;
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


                        <p style={{ color: 'red' }}>{this.state.server_response}</p>
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