import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import { Carousel , Button } from "react-bootstrap";
const CarouselHome = ( {userInfo} ) => {
  return (
    <Carousel className='mb-5'>
      <Carousel.Item>
        <img src='/images/dark.png' className="d-block w-100" alt='carousel-image' />
        <Carousel.Caption>
          <h3>Want to see your stuff here</h3>
          <p>Make some cash by selling things in your community.</p>
          <p>Its free and easy.</p>
          <LinkContainer to={userInfo ? "/addproduct" : "/login"}>
          <Button
            size="lg"
            variant="outline-light"
          >
            Start Selling
          </Button>
        </LinkContainer>
        </Carousel.Caption>
        
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHome;
