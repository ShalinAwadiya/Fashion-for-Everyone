import React from 'react';
import axios from 'axios';


class Commerce extends  React.Component {
  state={
      products:[]
    }
    componentDidMount(){
      //calling rest api for products data
      const products = [{product_title: "prod1", product_price: "100"}, {product_title: "prod2", product_price: "100"}]
      this.setState({products});
    }
  render() {
    return (
      <div className="App">
  <header className="section-header">
    <section className="header-main border-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-2 col-4">
            Company Name
          </div>
          <div className="col-lg-6 col-sm-12">
            <form action="#" className="search">
              <div className="input-group w-100">
                <input type="text" className="form-control" placeholder="Search" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </div> 
          <div className="col-lg-4 col-sm-6 col-12">
            <div className="widgets-wrap float-md-right">
              <div className="widget-header  mr-3">
                <a href="#" className="icon icon-sm rounded-circle border"><i className="fa fa-shopping-cart" /></a>
                <span className="badge badge-pill badge-danger notify">0</span>
              </div>
              <div className="widget-header icontext">
                <a href="#" className="icon icon-sm rounded-circle border"><i className="fa fa-user" /></a>
                <div className="text">
                  <span className="text-muted">Welcome!</span>
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
    <nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
      <div className="container">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="main_nav">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Supermarket</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Partnership</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Baby &amp; Toys</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Fitness sport</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Clothing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Furnitures</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"> More</a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Foods and Drink</a>
                <a className="dropdown-item" href="#">Home interior</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Category 1</a>
                <a className="dropdown-item" href="#">Category 2</a>
                <a className="dropdown-item" href="#">Category 3</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <section className="section-main bg padding-y">
    <div className="container">
      <div className="row">
        <aside className="col-md-3">
          <nav className="card">
            <ul className="menu-category">
              <li><a href="#">Best clothes</a></li>
              <li><a href="#">Automobiles</a></li>
              <li><a href="#">Home interior</a></li>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">Technologies</a></li>
              <li><a href="#">Digital goods</a></li>
              <li><a href="#">Online goods</a></li>
            </ul>
          </nav>
        </aside> 
        <div className="col-md-9">
          <article className="banner-wrap">
            <img src="/images/2.jpg" className="w-100 rounded" />
          </article>
        </div> 
      </div> 
    </div> 
  </section>
  <section className="section-name padding-y-sm">
    <div className="container">
      <header className="section-heading">
        <a href="#" className="btn btn-outline-primary float-right">See all</a>
        <h3 className="section-title">Popular products</h3>
      </header>
      <div className="row">
        {this.state.products.map((result) => {
          return (
        <div className="col-md-3">
          <div href="#" className="card card-product-grid">
            <a href="#" className="img-wrap"> <img src="/images/misc/appstore.png" /> </a>
            <figcaption className="info-wrap">
              <a href="#" className="title">{result.product_title}</a>
              <div className="price mt-1">{result.product_price}</div> 
            </figcaption>
          </div>
        </div> 
        )
         })}
      
      </div>
    </div>
  </section>
  <section className="section-name padding-y bg">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>Download app demo text</h3>
          <p>Get an amazing app  to make Your life easy</p>
        </div>
        <div className="col-md-6 text-md-right">
          <a href="#"><img src="/images/misc/appstore.png" height={40} /></a>
          <a href="#"><img src="/images/misc/appstore.png" height={40} /></a>
        </div>
      </div> 
    </div>
  </section>
  <footer className="section-footer border-top bg">
    <div className="container">
      <section className="footer-top  padding-y">
        <div className="row">
          <aside className="col-md col-6">
            <h6 className="title">Brands</h6>
            <ul className="list-unstyled">
              <li> <a href="#">Adidas</a></li>
              <li> <a href="#">Puma</a></li>
              <li> <a href="#">Reebok</a></li>
              <li> <a href="#">Nike</a></li>
            </ul>
          </aside>
          <aside className="col-md col-6">
            <h6 className="title">Company</h6>
            <ul className="list-unstyled">
              <li> <a href="#">About us</a></li>
              <li> <a href="#">Career</a></li>
              <li> <a href="#">Find a store</a></li>
              <li> <a href="#">Rules and terms</a></li>
              <li> <a href="#">Sitemap</a></li>
            </ul>
          </aside>
          <aside className="col-md col-6">
            <h6 className="title">Help</h6>
            <ul className="list-unstyled">
              <li> <a href="#">Contact us</a></li>
              <li> <a href="#">Money refund</a></li>
              <li> <a href="#">Order status</a></li>
              <li> <a href="#">Shipping info</a></li>
              <li> <a href="#">Open dispute</a></li>
            </ul>
          </aside>
          <aside className="col-md col-6">
            <h6 className="title">Account</h6>
            <ul className="list-unstyled">
              <li> <a href="#"> User Login </a></li>
              <li> <a href="#"> User register </a></li>
              <li> <a href="#"> Account Setting </a></li>
              <li> <a href="#"> My Orders </a></li>
            </ul>
          </aside>
          <aside className="col-md">
            <h6 className="title">Social</h6>
            <ul className="list-unstyled">
              <li><a href="#"> <i className="fab fa-facebook" /> Facebook </a></li>
              <li><a href="#"> <i className="fab fa-twitter" /> Twitter </a></li>
              <li><a href="#"> <i className="fab fa-instagram" /> Instagram </a></li>
              <li><a href="#"> <i className="fab fa-youtube" /> Youtube </a></li>
            </ul>
          </aside>
        </div> 
      </section>  
      <section className="footer-bottom row">
        <div className="col-md-2">
          <p className="text-muted">   2021 Company name </p>
        </div>
        <div className="col-md-8 text-md-center">
          <span className="px-2">info@com</span>
          <span className="px-2">+000-000-0000</span>
          <span className="px-2">Street name 123, ABC</span>
        </div>
        <div className="col-md-2 text-md-right text-muted">
          <i className="fab fa-lg fa-cc-visa" /> 
          <i className="fab fa-lg fa-cc-paypal" /> 
          <i className="fab fa-lg fa-cc-mastercard" />
        </div>
      </section>
    </div>
  </footer>
</div>
      
    );
  }
}
export default Commerce