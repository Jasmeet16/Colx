import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { login } from "../actions/userActions";

const LoginScreen = ({history, location}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector( (state) => state.userLogin );

  const { loading , error , userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(error)
    dispatch( login( email , password ) );
  };
    
  return (
    <Row className="justify-content-md-center">
      <Col md={6}>
      <h3 className='my-3 text-center'>SIGN IN</h3>
      { error && <Message variant='danger'> Invalid email or password </Message> }
      { loading ? <Loader></Loader> :  
      <Form onSubmit={submitHandler}>
      
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
           onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-7" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="dark" block>
          Submit
        </Button>
      </Form>
}

      <Row className="mt-5">
        <Col>
          <Row>
            <strong className="mx-auto"> New User ? </strong>
          </Row>
          <Button variant="link" block>
          <Link to= '/register'>
          <strong className="mx-auto text-dark"> Register Here </strong>
            </Link>
          </Button>
        </Col>
      </Row>
      </Col>
    </Row>
  );
};

export default LoginScreen;
