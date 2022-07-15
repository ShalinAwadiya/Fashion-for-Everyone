import { Component } from 'react';
import {Card, CardBody, CardTitle, CardFooter} from 'reactstrap';
import {Link} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AXIOS_CLIENT from "../../utils/apiClient";
import {toast} from "react-toastify";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default class User_Products extends Component{

    state={
        products: []
    };

    constructor(props) {
        super(props);
        console.log(props);
    }

    componentDidMount() {
        AXIOS_CLIENT.get('/products/').then((res) => {
            if (res.data) {
                console.log(res.data)
                this.setState(res.data);
            }
        }).catch(err => {
            console.error(err);
            toast.error("Something went wrong!");
        });
    }

    render = () =>{
        return(

            <div className="App">
                <Row>
                    {this.state.products && this.state.products.map((product) =>
                        <Col md="4">
                            <Card>
                                <CardBody>
                                    <Link to={{pathname:`/product/${product._id}`, state: {product} }} >
                                        <CardTitle><b>{product.brand}</b></CardTitle>
                                        <img class="img-thumbnail" src={product.imageUrl} />
                                    </Link>
                                    <p>{product.name}</p>
                                    <p>{product.description}</p>
                                    <p>Price: {product.price}$</p>
                                    {[...new Array(5)].map((arr, index) => {
                                        return index < product.rating ? <StarIcon style={{ color: 'orange' }}/> : <StarBorderIcon style={{ color: 'orange' }}/>;
                                    })}
                                    <span className="label-rating mr-3 "> {product.rating}/5</span>
                                </CardBody>
                                <CardFooter className="text-muted">
                                </CardFooter>
                            </Card>
                        </Col>
                    )
                    }
                </Row>
            </div>
        );
    }
}
