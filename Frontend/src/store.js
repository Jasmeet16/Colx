import { createStore , combineReducers , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

//reducers
import {productListReducer , productDetailReducer} from './reducers/productReducer'
import { cartItemReducer } from './reducers/cartReducer'
import { userLoginReducer } from './reducers/userReducers'
 


const reducer = combineReducers({ productList : productListReducer,  productDetails : productDetailReducer , cartItem : cartItemReducer , userLogin : userLoginReducer});

const cartItemsJson = JSON.parse(localStorage.getItem('cartItems'));


const cartItemsFromStorage = localStorage.getItem('cartItems') ? cartItemsJson : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;


const initialState = { 
    cart:{
        cartItems : cartItemsFromStorage,
    } ,
    userLogin:{
        userInfo:userInfoFromStorage
    }
 };

const middleware = [thunk];

const store = createStore( reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)));

export default store;