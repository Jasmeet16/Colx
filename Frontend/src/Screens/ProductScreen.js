import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button , Image ,Row ,Col ,ListGroup } from 'react-bootstrap';
// import products from '../products';
import Rating from '../Components/Rating'
import axios from 'axios';

const ProductScreen = ({match}) => {

    const [prod , setProduct] = useState({});

    useEffect(()=>{
        const fetchProduct = async ()=>{
            const {data} = await axios.get(`/api/products/${match.params.id}`);
            setProduct(data);
        }
        fetchProduct();
    },[match]);

    return (
        <>
            <Link to='/' className='btn btn-light'>Go back</Link>
            <Row>
                <Col md={5}>
                    <Image src={prod.image} alt={prod.name} rounded fluid/>
                </Col>
                
                <Col md={4}>
                    <h2></h2>
                    <ListGroup variant="flush">
                    <ListGroup.Item> <h2>{prod.name} </h2></ListGroup.Item>
                    <ListGroup.Item> <Rating value={prod.rating} text={prod.numReviews} /></ListGroup.Item>
                    <ListGroup.Item> <strong>Cost  {prod.price} </strong> </ListGroup.Item>
                    <ListGroup.Item> <p> {prod.description} </p> </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                <ListGroup.Item className="mt-3">
                        <Row>
                            <Col>Cost</Col>
                            <Col>
                            {prod.price}
                            </Col>     
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status</Col>
                            <Col>
                                {prod.countInStock > 0 ? "Available" : "Out Of Stock"}
                            </Col>     
                        </Row>
                    </ListGroup.Item>
                    <ListGroup>
                        <Button variant="dark" block> Add To Cart </Button>
                    </ListGroup>
                </Col>
                
            
            </Row>
                
        </>
    )
}

export default ProductScreen
