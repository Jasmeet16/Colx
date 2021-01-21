import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap';
import Rating from './Rating';
 
const Product = ( {product} ) => {
    return (
        <>
            <Card>
                <Link to={`/products/${product._id}`} >
                    <Card.Img src={product.image} variant="top"/>
                </Link>
                <Card.Body>
                <Link to={`/products/${product._id}`} className="text-dark" >
                    <Card.Title as="div"> <strong> {product.name} </strong> </Card.Title>
                </Link>
                <Card.Text as="div"> 
                    <Rating value={product.rating} text={product.numReviews} color="#FFD700" />
                </Card.Text> 
                <Card.Text as="h3"> 
                    ${product.price}
                </Card.Text>
            </Card.Body>
            </Card>
        </>
    )
}

export default Product
