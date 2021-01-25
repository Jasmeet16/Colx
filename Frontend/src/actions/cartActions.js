import axios from 'axios';
import { CART_ADD_ITEM , CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addItemToCart = (  id  ) => async ( dispatch , getState ) => {

    //console.log(id)

    const { data } = await axios.get(`/api/products/${id}`);

    console.log(getState())

    dispatch({
        type : CART_ADD_ITEM,
        payload :{
            data : data._id,
            image : data.image,
            name : data.name,
            price : data.price,
            inStock: data.inStock
        }
    });

    const toStore =   JSON.stringify(getState().cartItem.cartItems);
    localStorage.setItem( 'cartItems' , toStore );
}

export const removeItemCart = ( id ) => (dispatch , getState)=> {
    dispatch({
        type : CART_REMOVE_ITEM,
        payload : id
    });
    const toStore =   JSON.stringify(getState().cartItem.cartItems);
    localStorage.setItem( 'cartItems' , toStore );

}