import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, ListGroup, Image } from "react-bootstrap";
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
    <div>
      <h3 className="my-3 text-center"> MY ADS </h3>
      <Row>
        <Col md={6}>
          <ListGroup variant="flush">
            {products.map((p) => {
              return (
                <ListGroup.Item key={p.data}>
                  <Row>
                    <Col md={3} xs={5}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        className="rounded"
                        fluid
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
        <Col md={4}></Col>
      </Row>
    </div>
  );
};

export default MyAdsScreen;
