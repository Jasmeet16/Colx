import React, { useEffect} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'
import { Row , Col } from "react-bootstrap";
import Product from "../Components/Product";
import Loader from '../Components/Loader'
import Message from '../Components/Message'



const HomeScreen = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listProducts())
        
    },[dispatch]);

    const productList = useSelector( state => state.productList );
    const { loading , error , products } = productList;


    return (
        <>
            <h1>Products</h1>
            { 
            loading ? <Loader></Loader> : error ? <Message variant='danger' message={error.message}></Message>: 
            <Row> 
                {products.map((p)=>{
                    return(
                        <Col key={p._id} sm={12} md={6} lg={4} xl={3}> <Product product={p} /> </Col>
                    );
                })}
            </Row>   
            }
        </>
    )
}

export default HomeScreen
