import React, {useEffect} from 'react'
import {Link} from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';

import { Row , Col , Image , Alert, ListGroup ,Button } from 'react-bootstrap';

//Componenets

import Message from '../Components/Message';


//actions
import { addItemToCart , removeItemCart } from '../actions/cartActions';


const CartScreen = ({match}) => {

    const productId = match.params.id;
   

    const dispatch = useDispatch();

    useEffect( ()=>{
        if( productId ){
            dispatch( addItemToCart( productId ) )
        }
    }, [dispatch]);

   const {cartItems} = useSelector( state => state.cartItem );
   console.log(cartItems);

    //Handlers
    const onDeleteHandler = (p)=>{
        dispatch( removeItemCart(p) );
    }


    return (

        <Row>
            <Col md={8}>
                <h2>Wishlisted Items</h2>
                {
                    cartItems.length === 0 ? (<Message variant='danger' >There are no items in your wishlist <Link to="/" className='text-dark'>go back</Link> </Message>) :
                    
                        <ListGroup variant="flush" >
                            {
                                cartItems.map( (p) => {
                                    return (
                                        <ListGroup.Item key={p.data}>
                                        <Row>
                                            <Col md={3} xs={5}>
                                                <Image src={p.image} alt={p.name} className="rounded" fluid ></Image>
                                            </Col>
                                            <Col md={4} xs={3} className="mt-3">
                                                <Link to={`/products/${p.data}`}  className="texr-dark"> {p.name} </Link>
                                            </Col>
                                            <Col md={2} xs={2} className="mt-4">
                                                {p.price}
                                            </Col>
                                            <Col md={1} xs={2}>
                                                <Button variant='light' onClick={ () => onDeleteHandler(p.data) } className="mt-3" > <i className='fas fa-trash'></i> </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    )
                                })
                            }
                        </ListGroup>
                }
            </Col>
            <Col md={4}>

            </Col>
        </Row>
    )
}

export default CartScreen
