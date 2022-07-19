
import React, {useState} from 'react';
import {Link, useLocation, useParams} from 'react-router-dom'
import Col from "react-bootstrap/Col";
import {Card, CardBody, CardFooter, CardTitle} from "reactstrap";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Row from "react-bootstrap/Row";
import EditReview from "./EditReview";
import DeleteReview from "./DeleteReview";
import AXIOS_CLIENT from "../../utils/apiClient";

export default function ShowReviews(){

    const [productDetails, setProductDetails] = useState({});

    const{id} = useParams();

    const [productReviews, setProductReviews] = useState([]);

    const user_id = localStorage.getItem('userId');

    React.useEffect(() => {
        console.log("prod id", id);

        AXIOS_CLIENT.get('/products/' + id).then(res=> {
            console.log(res.data.product);
            setProductDetails(res.data.product);
        });

        AXIOS_CLIENT.get('/reviews/' + id).then(res=> {
            console.log(res.data);
            setProductReviews(res.data);
        });

    }, []);

    return (
        <div className="App">


            <section className="section-content padding-y bg">
                <div className="container">

                    <article className="card">
                        <div className="card-body">
                            <div className="row">
                                <aside className="col-md-6">
                                    <article className="gallery-wrap">
                                        <div className="card img-big-wrap">
                                            <a href="src/pages/reviews/ShowReviews#"> <img src={productDetails.imageUrl}/></a>
                                        </div>
                                        <div className="thumbs-wrap">
                                            <a href="src/pages/reviews/ShowReviews#" className="item-thumb"> <img src={productDetails.imageUrl}/></a>
                                            <a href="src/pages/reviews/ShowReviews#" className="item-thumb"> <img src={productDetails.imageUrl}/></a>
                                            <a href="src/pages/reviews/ShowReviews#" className="item-thumb"> <img src={productDetails.imageUrl}/></a>
                                            <a href="src/pages/reviews/ShowReviews#" className="item-thumb"> <img src={productDetails.imageUrl}/></a>
                                        </div>
                                    </article>
                                </aside>
                                <main className="col-md-6">
                                    <article>
                                        <h3 className="title">
                                            Reviews for <Link to={{pathname:`/product/${productDetails._id}`, state: {productDetails} }} >{productDetails.name}</Link>
                                        </h3>
                                        <Row>
                                            {productReviews && productReviews.map((review) =>
                                                <Col md="4">
                                                    <Card>
                                                        <CardBody>
                                                            <CardTitle>
                                                                <b>{review.userName}</b>
                                                                <b></b>
                                                                {
                                                                    user_id === review.userId ?
                                                                        <>
                                                                            <EditReview product_name={productDetails.name} review_data={review}></EditReview>
                                                                            <DeleteReview review_data={review}></DeleteReview>
                                                                        </>
                                                                        :
                                                                        null
                                                                }

                                                            </CardTitle>
                                                            <Box>
                                                                {[...new Array(5)].map((arr, index) => {
                                                                    return index < review.reviewScore ? <StarIcon style={{ color: 'orange' }}/> : <StarBorderIcon style={{ color: 'orange' }}/>;
                                                                })}
                                                                <span className="label-rating mr-3 text-muted">{review.reviewScore}/5 </span>
                                                            </Box>
                                                            <hr></hr>
                                                            <p>{review.reviewMessage}</p>
                                                        </CardBody>
                                                        <CardFooter className="text-muted">

                                                        </CardFooter>
                                                    </Card>
                                                </Col>
                                            )
                                            }
                                        </Row>
                                    </article>
                                </main>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    );
}