import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button , Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../Components/FormContainer";
import { addProduct } from "../actions/productActions";

const ProductAddScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const productAdd = useSelector((state) => state.productAdd);

  const { loading, error, success } = productAdd;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      addProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
      })
    );
  };

  useEffect(() => {
    
  }, [success])
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", form, config);
      setImage(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
      
    <Row className="justify-content-md-center">
      
        <Col md={7}>
          <h1 className="text-center">Advertise Product</h1>
          {success && <Alert variant='success'> Product added </Alert> }
        <Form onSubmit={submitHandler}>
          <Form.Row>
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            ></Form.File>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Group aria-label="Large" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="dark" block>
            Submit
          </Button>
        </Form>
      </Col>
      </Row>
  );
};

export default ProductAddScreen;
