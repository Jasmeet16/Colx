import { createStore , combineReducers , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer , productDetailReducer} from './reducers/productReducer'
import { cartItemReducer } from './reducers/cartReducer'



const reducer = combineReducers({ productList : productListReducer,  productDetails : productDetailReducer , cartItem : cartItemReducer});

const cartItemsJson = JSON.parse(localStorage.getItem('cartItems'));

const cartItemsFromStorage = localStorage.getItem('cartItems') ? cartItemsJson : [];

const initialState = { 
    cart:{
        cartItems : cartItemsFromStorage,
    } 
 };

const middleware = [thunk];

const store = createStore( reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)));

export default store;