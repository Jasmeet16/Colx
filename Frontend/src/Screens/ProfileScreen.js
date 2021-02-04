import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, ListGroup , Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../Components/Message";
import FormContainer from "../Components/FormContainer";

import { getUserDetails, updateUserDetails } from "../actions/userActions";
import { listProductByUser , deleteProduct } from "../actions/productActions";


const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");

  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [product, setProduct] = useState([]);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  const productByUser = useSelector((state) => state.productByUser);
  const { products } = productByUser;

  useEffect( () => {
    
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        //
      } else {
        setName(user.name);
        setEmail(user.email);
        setCollege(user.college);
        setCity(user.city);
        setPassword(user.password);
        setPhone(user.phone);
        
      }
        dispatch(listProductByUser())
        //setProduct( products )
      
    }
  }, [dispatch, history, userInfo, user ]);



  const onDeleteHandler = (id) => {
    dispatch(deleteProduct(id));
    dispatch(listProductByUser());
  }


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserDetails({
        id: user._id,
        name,
        email,
        password,
        college,
        city,
        phone,
      })
    );
  };

  return (
    <div className="d-flex">
      <FormContainer>
        <h3 className="my-3 text-center">User Profile</h3>
        {success && (
          <Message variant="success"> Profile Updated Successfully </Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Row>
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Update email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Update name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Update Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="college">
            <Form.Label>College</Form.Label>
            <Form.Control
              placeholder="Enter College Name"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="City">
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Button variant="dark" type="submit" block>
            Submit
          </Button>
        </Form>
      </FormContainer>
          <div>  <h3 className="my-3 text-center">Products Advertised</h3>
      <Row>
        <Col md={12}>
          <ListGroup variant="flush">
            {products.map((p) => {
              return (
                <ListGroup.Item key={p.data}>
                  <Row>
                    {/* <Col md={3} xs={5}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        className="rounded"
                        fluid
                      ></Image>
                    </Col> */}
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
                          console.log(p._id)
                          onDeleteHandler(p._id)
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
    </div>
  );
};

export default ProfileScreen;
