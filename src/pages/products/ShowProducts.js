import { Component } from 'react';
import {Card, CardBody, CardTitle, CardFooter} from 'reactstrap';
import DeleteModal from './DeleteModal';
import AddModal from './AddModal.js'
import EditModal from './EditModal.js'

import {Link} from 'react-router-dom'
import Header from './Header';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class ShowProducts extends Component{

    constructor(props) {
        super(props);
        console.log(props);
    
        this.state={
            products : [{name:'shirt', description:'my product', price:'70', imagesrc:"/images/items/1.jpg"},
            {name:'jacket', description:'my product', price:'100', imagesrc:"/images/items/2.jpg"},
            {name:'trouser', description:'my product', price:'50', imagesrc:"/images/items/3.jpg"},
            {name:'Bag', description:'my product', price:'10', imagesrc:"/images/items/4.jpg"},
            {name:'Mac', description:'my product', price:'1000', imagesrc:"/images/items/5.jpg"},
            {name:'Sofa', description:'my product', price:'500', imagesrc:"/images/items/6.jpg"},
            {name:'Watch', description:'my product', price:'100', imagesrc:"/images/items/7.jpg"},
            {name:'Headphone', description:'my product', price:'40', imagesrc:"/images/items/9.jpg"}]
        };
    }
    
    render = () =>{
        return(

            <div className="App">
                <Header></Header>
                <span style={{textAlign: "center"}}>
                    <h1>Products <AddModal></AddModal></h1>
                    <br></br>
                </span>

                <Row>
                {this.state.products && this.state.products.map((product) =>
                    <Col md="4">
                        <Card>
                                <CardBody>
                                    <Link to={{pathname:`/product/`, state: {product} }} >
                                        <CardTitle><b>{product.name}</b></CardTitle>

                                        <img class="img-thumbnail" src={product.imagesrc} />
                                    </Link>
                                        <p>Some quick example text to build on the card title
                                            and make up the bulk of the card's content.</p>
                                        <p>Price: {product.price}$</p>
                                </CardBody>
                            <CardFooter className="text-muted">
                                <DeleteModal productName={product.name}></DeleteModal>
                                <EditModal product_data={product}/>
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
