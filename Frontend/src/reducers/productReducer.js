import  { PRODUCT_LIST_FAIL , PRODUCT_LIST_REQUEST , PRODUCT_LIST_SUCCESS , PRODUCT_DETAIL_REQUEST , PRODUCT_DETAIL_SUCCESS ,PRODUCT_DETAIL_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL, PRODUCT_BYUSER_FAIL, PRODUCT_BYUSER_SUCCESS, PRODUCT_BYUSER_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST } from '../constants/productConstants'

export const productListReducer = ( state = { products:[] } , action ) =>{
    switch( action.type ){
        case PRODUCT_LIST_REQUEST:
            return {loading : true,products : []}
        case PRODUCT_LIST_SUCCESS:
                return {loading : false , products : action.payload.products , page : action.payload.page , pages : action.payload.pages }
        case PRODUCT_LIST_FAIL:
            return {loading : false , error : action.payload}
        default:
            return state;
    }
}

export const productDetailReducer = ( state = {product : {}} , action )=>{
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return { loading : true , ...state }
        case PRODUCT_DETAIL_SUCCESS:
            return {loading : false , product : action.payload}
        case PRODUCT_DETAIL_FAIL:
            return {loading : false , error : action.payload}
        default:
            return state;
    }
} 

export const productByUserReducer = ( state = { products : [] } , action )=>{
    switch(action.type){
        case PRODUCT_BYUSER_REQUEST:
            return { loading : true,products : []  }
        case PRODUCT_BYUSER_SUCCESS:
            return {loading : false , products : action.payload}
        case PRODUCT_BYUSER_FAIL:
            return {loading : false , error : action.payload}
        default:
            return state;
    }
} 

export const productAddReducer = ( state = {product : {}} , action )=>{
    switch(action.type){
        case PRODUCT_ADD_REQUEST:
            return { loading : true }
        case PRODUCT_ADD_SUCCESS:
            return {loading : false , success:true , product : action.payload}
        case PRODUCT_ADD_FAIL:
            return {loading : false , error : action.payload}
        default:
            return state;
    }
} 


export const productDeleteReducer = ( state = {product : {}} , action )=>{
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return { loading : true , ...state }
        case PRODUCT_DELETE_SUCCESS:
            return {loading : false , success : true}
        case PRODUCT_DELETE_FAIL:
            return {loading : false , error : action.payload}
        default:
            return state;
    }
} 


