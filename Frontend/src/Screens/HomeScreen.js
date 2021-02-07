import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Product from "../Components/Product";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Paginate from "../Components/Paginate";
import CarouselHome from "../Components/CarouselHome";



const HomeScreen = ({match}) => {
  const searchKey = match.params.searchKey;

  const pageNumber = match.params.pageNumber || 1;


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(searchKey , pageNumber));
  }, [dispatch , searchKey , pageNumber]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products , page , pages } = productList;

  return (
    <>
      { pageNumber === 1 && !searchKey && <CarouselHome userInfo={userInfo}></CarouselHome>}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger" message={error.message}></Message>
        ) : (
            <>
        <Row>
          {products.map((p) => {
            return (
              <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                {" "}
                <Product product={p} />{" "}
              </Col>
            );
          })}
              </Row>
<Paginate page={page} pages={pages} keyword={searchKey}></Paginate>
              </>
      )}
      <OverlayTrigger
        overlay={<Tooltip id="button-tooltip-2"> Post your AD </Tooltip>}
      >
        <LinkContainer to={userInfo ? "/addproduct" : "/login"}>
          <Button
            className="add-button rounded-pill"
            size="lg"
            variant="outline-dark"
          >
            <i className="fas fa-plus"></i> Sell
          </Button>
        </LinkContainer>
      </OverlayTrigger>
    </>
  );
};

export default HomeScreen;
