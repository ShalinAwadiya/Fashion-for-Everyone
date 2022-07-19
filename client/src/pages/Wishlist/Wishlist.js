// Shalin Hasanbhai Awadiya - B00892907

import { Component } from "react";
import { Card, CardBody, CardTitle, CardFooter } from "reactstrap";
import DeleteModal from "../products/DeleteModal";
import AddModal from "../products/AddModal.js";
import EditModal from "../products/EditModal.js";

import { Link } from "react-router-dom";
import Header from "../products/Header";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-pro-sidebar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AXIOS_CLIENT from "../../utils/apiClient";
import { toast } from "react-toastify";

import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getUserId } from "../../utils/firebase";

export default class Wishlist extends Component {
  state = {
    products: [],
  };

  constructor(props) {
    super(props);
    console.log(props);
  }
  clickHandler = async (wishlistId) => {
    console.log("hello", wishlistId);
    const response = await AXIOS_CLIENT.delete(
      "/wishlist/user/deleteProductFromWishlist/" + wishlistId
    );
    console.log("Response:", response.data);
    this.componentDidMount();
  };
  async componentDidMount() {
    const userId = getUserId();
    const response = await AXIOS_CLIENT.get(
      "/wishlist/user/getWishlist/" + userId
    );
    const products = response.data;
    console.log("Products", products);
    this.setState(products);
  }

  render = () => {
    return (
      <div className="App">
        <span style={{ textAlign: "center" }}>
          <h1>
            Wishlist
          </h1>
          <br></br>
        </span>

        <Row>
          {this.state.products &&
            this.state.products.map((product) => (
              <Col md="4">
                <Card>
                  <CardBody>
                    <Link
                      to={{
                        pathname: `/product/${product._id}`,
                        state: { product },
                      }}
                    >
                      <CardTitle>
                        <b>{product.brand}</b>
                      </CardTitle>
                      <img class="img-thumbnail" src={product.imageUrl} />
                    </Link>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>Price: {product.price}$</p>
                    {[...new Array(5)].map((arr, index) => {
                      return index < product.rating ? (
                        <StarIcon style={{ color: "orange" }} />
                      ) : (
                        <StarBorderIcon style={{ color: "orange" }} />
                      );
                    })}
                    <span className="label-rating mr-3 ">
                      {" "}
                      {product.rating}/5
                    </span>
                    <i
                      class="fa fa-heart"
                      style={{ fontSize: "25px", color: "red" }}
                      onClick={() => {
                        return this.clickHandler(product.wishlistId);
                      }}
                    ></i>
                  </CardBody>
                  {/*
                  <CardFooter className="text-muted">
                    <DeleteModal product_data={product}></DeleteModal>
                    <EditModal product_data={product} />
                  </CardFooter>
                  */}
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    );
  };
}
