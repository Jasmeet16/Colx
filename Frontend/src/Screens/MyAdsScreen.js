import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../Components/Message";

import { listProductByUser, deleteProduct } from "../actions/productActions";

const MyAdsScreen = () => {
  const dispatch = useDispatch();

  const productByUser = useSelector((state) => state.productByUser);
  const { products } = productByUser;

  useEffect(() => {
    dispatch(listProductByUser());
  }, [dispatch]);

  const onDeleteHandler = (id) => {
    dispatch(deleteProduct(id));
    dispatch(listProductByUser());
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
      <h3 className="my-3 text-center"> MY ADS </h3>
      {products.length === 0 ? (
        <Message variant='danger'> No ADs posted <Link to="/addproduct" className='text-dark'> <strong>click here</strong></Link> to post one </Message>
      ) : (
        <Row >
          <Col>
            <ListGroup variant="flush">
              {products.map((p) => {
                return (
                  <ListGroup.Item key={p.data}>
                    <Row>
                      <Col md={3} xs={5}>
                        <Image
                          src={p.image}
                          alt={p.name}
                          className="rounded card-img-top"
                        ></Image>
                      </Col>
                      <Col md={4} xs={3} className="mt-3">
                        <Link to={`/products/${p._id}`} className="text-dark">
                          {" "}
                          {p.name}{" "}
                        </Link>
                      </Col>
                      <Col md={2} xs={2} className="mt-4">
                        {p.price}
                      </Col>
                      <Col md={1} xs={2}>
                        <Button
                          variant="light"
                          onClick={() => {
                            console.log(p._id);
                            onDeleteHandler(p._id);
                          }}
                          className="mt-3"
                        >
                          {" "}
                          <i className="fas fa-trash"></i>{" "}
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
          )}
        </Col>
    </Row>
  );
};

export default MyAdsScreen;
