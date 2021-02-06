import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Route } from "react-router-dom";

import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

//
import SearchBar from './SearchBar'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    console.log("logout");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container className='align-center'>
          <LinkContainer to="/">
            <Navbar.Brand href="/" className='ml-5'>Colx</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Route render={( {history})=> <SearchBar history={history} /> } />

            <Nav className="ml-auto">
              
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-heart px-1"></i>Wishlist
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="collasible-nav-dropdown"
                  className='super-colors'
                > 
                    <LinkContainer to="/profile" variant="success">
                      <NavDropdown.Item >Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/myads">
                      <NavDropdown.Item>My ADs</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                 
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
