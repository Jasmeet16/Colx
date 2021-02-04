import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_BYUSER_REQUEST,
  PRODUCT_BYUSER_SUCCESS,
  PRODUCT_BYUSER_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    //console.log(id);
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

export const listProductByUser = (id) => async (dispatch, getState) => {
  try {

    dispatch({ type: PRODUCT_BYUSER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data:{products} } = await axios.get(`/api/user/${id}`, config );
   
    let arr = [];

    
    Promise.all(products.map(async (pid) => {
      axios.get(`/api/products/${pid}`).then((res) => {
        arr.push(res.data);
      })
      
    })).then(
      dispatch({
        type: PRODUCT_BYUSER_SUCCESS,
        payload: arr,
      })
    );

    //console.log(id);
    //const {data} = await axios.get(`/api/products/${id}`)

    
  } catch (error) {
    dispatch({ type: PRODUCT_BYUSER_FAIL, payload: error.message });
  }
};

export const addProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, product, config);

    dispatch({
      type: PRODUCT_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_ADD_FAIL,
      payload: message,
    });
  }
};
