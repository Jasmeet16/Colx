//imports
import React,{ useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button , Image ,Row ,Col ,ListGroup } from 'react-bootstrap';

//components
import { useDispatch  , useSelector } from 'react-redux';
import Rating from '../Components/Rating'
import Message from '../Components/Message'
import Loader from '../Components/Loader';

//actions
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({match}) => {

   const dispatch  = useDispatch();

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id));
    },[dispatch , match]);


    const prodDetail = useSelector( (state) => state.productDetails );

    const {loading, error , product } = prodDetail;

    return (
        <>
            <Link to='/' className='btn btn-light'>Go back</Link>
            { loading ? <Loader></Loader> : error ? <Message variant='danger' children={error}></Message> :  
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} rounded fluid/>
                </Col>
                
                <Col md={4}>
                    <ListGroup variant="flush">
                    <ListGroup.Item> <h2>{product.name} </h2></ListGroup.Item>
                    <ListGroup.Item> <Rating value={product.rating} text={product.numReviews} /></ListGroup.Item>
                    <ListGroup.Item> <strong>Cost  {product.price} </strong> </ListGroup.Item>
                    <ListGroup.Item> <p> {product.description} </p> </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                <ListGroup.Item className="mt-3">
                        <Row>
                            <Col>Cost</Col>
                            <Col>
                            {product.price}
                            </Col>     
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status</Col>
                            <Col>
                                {product.countInStock > 0 ? "Available" : "Out Of Stock"}
                            </Col>     
                        </Row>
                    </ListGroup.Item>
                    <ListGroup>
                        <Button variant="dark" block> Add To Cart </Button>
                    </ListGroup>
                </Col>
                
            
            </Row>
            }    
        </>
    )
}

export default ProductScreen
