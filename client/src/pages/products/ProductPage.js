import React, { useEffect, useState } from "react";
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import AddReview from "../reviews/AddReview";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AXIOS_CLIENT from "../../utils/apiClient";


export default function ProductPage() {

    const{id} = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState({});

    React.useEffect(() => {
        console.log("inside product page id=", id);
        // console.log("prod details", product_detail);

        AXIOS_CLIENT.get('/products/' + id).then(res=> {
                console.log(res.data.product);
                setProduct(res.data.product);
            });
    }, []);

    const addProductToCard = () => {
        console.log("posting product", product);
        AXIOS_CLIENT.post('/cart/post_cart', product).then(res=> {
           console.log('product posted to cart successfully');
        });
        navigate('/cart');
    }

    return (
        <div className="App">
            <section class="section-content padding-y bg">
                <div class="container">

                    <article class="card">
                        <div class="card-body">
                            <div class="row">
                                <aside class="col-md-6">
                                    <article class="gallery-wrap">
                                        <div class="card img-big-wrap">
                                            <a href="src/pages/products/ProductPage#"> <img src={product.imageUrl} /></a>
                                        </div>
                                        <div class="thumbs-wrap">
                                            <a href="src/pages/products/ProductPage#" class="item-thumb"> <img src={product.imageUrl} /></a>
                                            <a href="src/pages/products/ProductPage#" class="item-thumb"> <img src={product.imageUrl} /></a>
                                            <a href="src/pages/products/ProductPage#" class="item-thumb"> <img src={product.imageUrl} /></a>
                                            <a href="src/pages/products/ProductPage#" class="item-thumb"> <img src={product.imageUrl} /></a>
                                        </div>
                                    </article>
                                </aside>
                                <main class="col-md-6">
                                    <article>
                                        <h3 class="title">{product.name}</h3>
                                        <div>
                                            <Link to={"/product/review"}>
                                                {[...new Array(5)].map((arr, index) => {
                                                    return index < 3 ? <StarIcon style={{ color: 'orange' }}/> : <StarBorderIcon style={{ color: 'orange' }}/>;
                                                })}
                                                <span className="label-rating mr-3 ">3/5</span>
                                            </Link>
                                            <a href="src/pages/products/ProductPage#" class="btn-link  mr-3 text-muted"> <i class="fa fa-heart"></i> Save for later </a>
                                            <a href="src/pages/products/ProductPage#" class="btn-link text-muted"> <i class="fa fa-book-open"></i> Compare </a>
                                        </div>

                                        <hr />

                                        <div class="mb-3">
                                            <h6>Brand</h6>
                                            <ul className="list-dots mb-0">
                                                <li>{product.brand}</li>
                                            </ul>

                                            <h6>Product description</h6>
                                            <ul class="list-dots mb-0">
                                                <li>{product.description}</li>
                                            </ul>
                                        </div>

                                        {/*product mesasurement details*/}
                                        {/*<div class="form-group">*/}
                                        {/*    <label class="text-muted">Available sizes</label>*/}
                                        {/*    <div>*/}
                                        {/*        <label class="btn">*/}
                                        {/*            <input type="radio" name="option_size" value="option1" checked="" />*/}
                                        {/*            <span>Small</span>*/}
                                        {/*        </label>*/}
                                        {/*        <label class="btn">*/}
                                        {/*            <input type="radio" name="option_size" value="option1" />*/}
                                        {/*            <span>Medium</span>*/}
                                        {/*        </label>*/}
                                        {/*        <label class="btn">*/}
                                        {/*            <input type="radio" name="option_size" value="option1" />*/}
                                        {/*            <span>Large</span>*/}
                                        {/*        </label>*/}
                                        {/*        <label class="btn">*/}
                                        {/*            <input type="radio" name="option_size" disabled="" value="option1" />*/}
                                        {/*            <span>Babies</span>*/}
                                        {/*        </label>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                        <div class="mb-3">
                                            <var class="price h4">${product.price}</var> <br />
                                            <span class="monthly">No EMI Option available for this product</span>
                                        </div>

                                        <div class="mb-4" style={{marginTop: "100px", marginLeft:"170px"}}>
                                            {/*<Link to={"/cart"}>*/}
                                                <a  class="btn btn-light" onClick={addProductToCard}>Buy Now</a>
                                            {/*</Link>*/}
                                            <AddReview product_name={'Trouser'}></AddReview>
                                        </div>

                                    </article>
                                </main>
                            </div>
                        </div>
                    </article>

                    {/*<article class="card mt-5">*/}
                    {/*    <div class="card-body">*/}
                    {/*        <div class="row">*/}
                    {/*            <aside class="col-md-6">*/}
                    {/*                <h5>Parameters</h5>*/}
                    {/*                <dl class="row">*/}
                    {/*                    <dt class="col-sm-3">Display</dt>*/}
                    {/*                    <dd class="col-sm-9">13.3-inch LED-backlit display with IPS</dd>*/}

                    {/*                    <dt class="col-sm-3">Processor</dt>*/}
                    {/*                    <dd class="col-sm-9">2.3GHz dual-core Intel Core i5</dd>*/}

                    {/*                    <dt class="col-sm-3">Camera</dt>*/}
                    {/*                    <dd class="col-sm-9">720p FaceTime HD camera</dd>*/}

                    {/*                    <dt class="col-sm-3">Memory</dt>*/}
                    {/*                    <dd class="col-sm-9">8 GB RAM or 16 GB RAM</dd>*/}

                    {/*                    <dt class="col-sm-3">Graphics</dt>*/}
                    {/*                    <dd class="col-sm-9">Intel Iris Plus Graphics 640</dd>*/}
                    {/*                </dl>*/}
                    {/*            </aside>*/}
                    {/*            <aside class="col-md-6">*/}
                    {/*                <h5>Features</h5>*/}
                    {/*                <ul class="list-check">*/}
                    {/*                    <li>Best performance of battery</li>*/}
                    {/*                    <li>5 years warranty for this product</li>*/}
                    {/*                    <li>Amazing features and high quality</li>*/}
                    {/*                    <li>Best performance of battery</li>*/}
                    {/*                    <li>5 years warranty for this product</li>*/}
                    {/*                </ul>*/}
                    {/*            </aside>*/}
                    {/*        </div>*/}
                    {/*        <hr />*/}
                    {/*        <p>*/}
                    {/*            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod*/}
                    {/*            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,*/}
                    {/*            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo*/}
                    {/*            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse*/}
                    {/*            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non*/}
                    {/*            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</article>*/}
                </div>


            </section>
        </div>
    );
}
