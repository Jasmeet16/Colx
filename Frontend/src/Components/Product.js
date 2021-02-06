import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap';

 
const Product = ( {product} ) => {
    return (
        <>
            <Card className='my-1'>
                <Link to={`/products/${product._id}`} >
                    <Card.Img src={product.image} className='card-img-top' variant="top"/>
                </Link>
                <Card.Body>
                <Link to={`/products/${product._id}`} className="text-dark" >
                    <Card.Title as="div"> <strong> {product.name} </strong> </Card.Title>
                </Link>
                <Card.Text as="h3"> 
                    ₹{product.price}
                </Card.Text>
            </Card.Body>
            </Card>
        </>
    )
}

export default Product
