import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "./Header";
import {Link, useLocation} from 'react-router-dom'
import AddReview from "./AddReview";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function ProductPage() {

    const product_detail = useLocation();

    React.useEffect(() => {
        console.log("inside product page");
        console.log("prod details", product_detail);
    }, []);


    return (
        <div className="App">
            <Header></Header>
            <header class="section-header">
                <section class="header-main border-bottom">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-2 col-4">
                                Company Name
                            </div>
                            <div class="col-lg-6 col-sm-12">
                                <form action="#" class="search">
                                    <div class="input-group w-100">
                                        <input type="text" class="form-control" placeholder="Search" />
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="submit">
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-12">
                                <div class="widgets-wrap float-md-right">
                                    <div class="widget-header  mr-3">
                                        <a href="#" class="icon icon-sm rounded-circle border"><i class="fa fa-shopping-cart"></i></a>
                                        <span class="badge badge-pill badge-danger notify">0</span>
                                    </div>
                                    <div class="widget-header icontext">
                                        <a href="#" class="icon icon-sm rounded-circle border"><i class="fa fa-user"></i></a>
                                        <div class="text">
                                            <span class="text-muted">Welcome!</span>
                                            <div>
                                                <a href="#">Sign in</a> |
                                                <a href="#"> Register</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>




            <section class="section-content padding-y bg">
                <div class="container">

                    <article class="card">
                        <div class="card-body">
                            <div class="row">
                                <aside class="col-md-6">
                                    <article class="gallery-wrap">
                                        <div class="card img-big-wrap">
                                            <a href="#"> <img src="/images/items/3.jpg" /></a>
                                        </div>
                                        <div class="thumbs-wrap">
                                            <a href="#" class="item-thumb"> <img src="/images/items/3.jpg" /></a>
                                            <a href="#" class="item-thumb"> <img src="/images/items/3.jpg" /></a>
                                            <a href="#" class="item-thumb"> <img src="/images/items/3.jpg" /></a>
                                            <a href="#" class="item-thumb"> <img src="/images/items/3.jpg" /></a>
                                        </div>
                                    </article>
                                </aside>
                                <main class="col-md-6">
                                    <article>
                                        <a href="#" class="text-primary btn-link">Clothes</a>
                                        <h3 class="title">Great product name goes here</h3>
                                        <div>
                                            <Link to={"/product/review"}>
                                                {[...new Array(5)].map((arr, index) => {
                                                    return index < 3 ? <StarIcon style={{ color: 'orange' }}/> : <StarBorderIcon style={{ color: 'orange' }}/>;
                                                })}
                                                <span className="label-rating mr-3 ">3/5</span>
                                            </Link>
                                            <a href="#" class="btn-link  mr-3 text-muted"> <i class="fa fa-heart"></i> Save for later </a>
                                            <a href="#" class="btn-link text-muted"> <i class="fa fa-book-open"></i> Compare </a>
                                        </div>

                                        <hr />

                                        <div class="mb-3">
                                            <h6>Short description</h6>
                                            <ul class="list-dots mb-0">
                                                <li>Made in Russia</li>
                                                <li>Wolf leather </li>
                                                <li>Rubber material bottom</li>
                                                <li>Dark blue color</li>
                                            </ul>
                                        </div>

                                        <div class="form-group">
                                            <label class="text-muted">Available sizes</label>
                                            <div>
                                                <label class="btn">
                                                    <input type="radio" name="option_size" value="option1" checked="" />
                                                    <span>Small</span>
                                                </label>
                                                <label class="btn">
                                                    <input type="radio" name="option_size" value="option1" />
                                                    <span>Medium</span>
                                                </label>
                                                <label class="btn">
                                                    <input type="radio" name="option_size" value="option1" />
                                                    <span>Large</span>
                                                </label>
                                                <label class="btn">
                                                    <input type="radio" name="option_size" disabled="" value="option1" />
                                                    <span>Babies</span>
                                                </label>
                                            </div>

                                        </div>

                                        <div class="mb-3">
                                            <var class="price h4">$230.00</var> <br />
                                            <span class="monthly">$32.00 / monthly <a href="#" class="btn-link">installment </a></span>
                                        </div>

                                        <div class="mb-4">
                                            <a href="#" class="btn btn-primary mr-1">Buy now</a>
                                            <a href="#" class="btn btn-light">Add to card</a>
                                            <AddReview product_name={'Trouser'}></AddReview>
                                        </div>

                                    </article>
                                </main>
                            </div>
                        </div>
                    </article>
                    <article class="card mt-5">
                        <div class="card-body">
                            <div class="row">
                                <aside class="col-md-6">
                                    <h5>Parameters</h5>
                                    <dl class="row">
                                        <dt class="col-sm-3">Display</dt>
                                        <dd class="col-sm-9">13.3-inch LED-backlit display with IPS</dd>

                                        <dt class="col-sm-3">Processor</dt>
                                        <dd class="col-sm-9">2.3GHz dual-core Intel Core i5</dd>

                                        <dt class="col-sm-3">Camera</dt>
                                        <dd class="col-sm-9">720p FaceTime HD camera</dd>

                                        <dt class="col-sm-3">Memory</dt>
                                        <dd class="col-sm-9">8 GB RAM or 16 GB RAM</dd>

                                        <dt class="col-sm-3">Graphics</dt>
                                        <dd class="col-sm-9">Intel Iris Plus Graphics 640</dd>
                                    </dl>
                                </aside>
                                <aside class="col-md-6">
                                    <h5>Features</h5>
                                    <ul class="list-check">
                                        <li>Best performance of battery</li>
                                        <li>5 years warranty for this product</li>
                                        <li>Amazing features and high quality</li>
                                        <li>Best performance of battery</li>
                                        <li>5 years warranty for this product</li>
                                    </ul>
                                </aside>
                            </div>
                            <hr />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </article>
                </div>


            </section>

            <footer class="section-footer border-top padding-y">
                <div class="container">
                    <p class="float-md-right">
                        &copy; Copyright 2021 All rights reserved
                    </p>
                    <p>
                        <a href="#">Terms and conditions</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
