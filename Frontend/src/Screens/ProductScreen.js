//imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Image,
  Row,
  Col,
  ListGroup,
  Accordion,
  Card,
} from "react-bootstrap";
import axios from "axios";

//components
import { useDispatch, useSelector } from "react-redux";
import Rating from "../Components/Rating";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

//actions
import { listProductDetails } from "../actions/productActions";
import { getUserDetails } from "../actions/userActions";

const ProductScreen = ({ history, match }) => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");

  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const prodDetail = useSelector((state) => state.productDetails);

  const { loading, error, product } = prodDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  //Handlers

  const addToCartHandler = () => {
    //console.log("cart button clicked");
    history.push(`/cart/${match.params.id}`);
  };

  const getUserHandler = async () => {
    const { data } = await axios.get(`/api/user/${product.user}`);
    // console.log(data);
    setName(data.name);
    setEmail(data.email);
    setCollege(data.college);
    setPhone(data.phone);
  };

  return (
    <>
      <Link to="/" className="btn btn-light">
        Go back
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger" children={error}></Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} rounded fluid />
          </Col>
          <Col md={2}></Col>

          <Col md={4}>
            <ListGroup.Item className="mt-2">
              <Row>
                <Col>Cost</Col>
                <Col>₹ {product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status</Col>
                <Col>{product.inStock ? "Available" : "Out Of Stock"}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle
                    as={Button}
                    onClick={getUserHandler}
                    variant="dark"
                    eventKey="1"
                    block
                  >
                    View Owner Details
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey="1">
                    {!userInfo ? (
                     <Row className='mt-3'>
                     <Col>
                       <Row>
                         <strong className="mx-auto"> Login first to see the details </strong>
                       </Row>
                       <Button variant="link" block>
                       <Link to= '/login'>
                       <p className="mx-auto text-dark"> Login Here </p>
                         </Link>
                       </Button>
                     </Col>
                   </Row>
                    ) : (
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <Row>
                              <Col>Name</Col>
                              <Col>{name}</Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Row>
                              <Col>College</Col>
                              <Col>{college}</Col>
                            </Row>
                          </ListGroup.Item>

                          <ListGroup.Item className="text-center">
                            <strong>Contact Details</strong>
                          </ListGroup.Item>
                          <br></br>
                          <ListGroup.Item>
                            <Row>
                              <Col>Email</Col>
                              <Col>
                                <a
                                  href={`mailto:${email}`}
                                  className="text-dark"
                                >
                                  {email}
                                </a>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Row>
                              <Col>Phone</Col>
                              <Col>{phone}</Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    )}
                  </Accordion.Collapse>
                </Card>
              </Accordion>{" "}
            </ListGroup.Item>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {" "}
              <h2>{product.name} </h2>
            </ListGroup.Item>

            <ListGroup.Item>
              {" "}
              <p> {product.description} </p>{" "}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
