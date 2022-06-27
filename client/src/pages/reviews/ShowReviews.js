
import React from 'react';
import {Link, useLocation} from 'react-router-dom'
import Header from "../products/Header";
import Col from "react-bootstrap/Col";
import {Card, CardBody, CardFooter, CardTitle} from "reactstrap";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Row from "react-bootstrap/Row";
import EditReview from "./EditReview";
import DeleteReview from "./DeleteReview";

export default function ShowReviews(){

    const product_detail = useLocation();

    const product_reviews = [{user_name:"shathish", review_message:"good product Some quick example text to build on the card title*/}\n" +
            "                                                            {/*    and make up the bulk of the card's content.", review_score: 5},
        {user_name:"Deep", review_message:"Average productSome quick example text to build on the card title*/}\n" +
                "                                                            {/*    and make up the bulk of the card's content.", review_score: 3},
        {user_name:"Minal", review_message:"Bad product Some quick example text to build on the card title*/}\n" +
                "                                                            {/*    and make up the bulk of the card's content.", review_score: 1},
        {user_name:"Deep", review_message:"Average product Some quick example text to build on the card title*/}\n" +
                "                                                            {/*    and make up the bulk of the card's content.", review_score: 3},
        {user_name:"Minal", review_message:"Bad product Some quick example text to build on the card title*/}\n" +
                "                                                            {/*    and make up the bulk of the card's content.", review_score: 2}]

    React.useEffect(() => {
        console.log("inside product page");
        console.log("prod details", product_detail);
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
                                            <a href="src/pages/reviews/ShowReviews#"> <img src="/images/items/3.jpg"/></a>
                                        </div>
                                        <div className="thumbs-wrap">
                                            <a href="src/pages/reviews/ShowReviews#" className="item-thumb"> <img src="/images/items/3.jpg"/></a>
                                            <a href="src/pages/reviews/ShowReviews#" className="item-thumb"> <img src="/images/items/3.jpg"/></a>
                                            <a href="src/pages/reviews/ShowReviews#" className="item-thumb"> <img src="/images/items/3.jpg"/></a>
                                            <a href="src/pages/reviews/ShowReviews#" className="item-thumb"> <img src="/images/items/3.jpg"/></a>
                                        </div>
                                    </article>
                                </aside>
                                <main className="col-md-6">
                                    <article>
                                        <h3 className="title">
                                            Reviews for <Link to={'/product'}>Trouser</Link>
                                        </h3>
                                        <Row>
                                            {product_reviews && product_reviews.map((review) =>
                                                <Col md="4">
                                                    <Card>
                                                        <CardBody>
                                                            <CardTitle>
                                                                <b>{review.user_name}</b>
                                                                <EditReview product_name={'Trouser'} review_message={review.review_message} rating={review.review_score}></EditReview>
                                                                <DeleteReview></DeleteReview>
                                                            </CardTitle>
                                                            <Box>
                                                                {[...new Array(5)].map((arr, index) => {
                                                                    return index < review.review_score ? <StarIcon style={{ color: 'orange' }}/> : <StarBorderIcon style={{ color: 'orange' }}/>;
                                                                })}
                                                                <span className="label-rating mr-3 text-muted">{review.review_score}/5 </span>
                                                            </Box>
                                                            <hr></hr>
                                                            <p>{review.review_message}</p>
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