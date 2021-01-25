import {CART_ADD_ITEM , CART_REMOVE_ITEM} from '../constants/cartConstants';

export const cartItemReducer = ( state = { cartItems : [] } , action )=>{

    switch(action.type){
        case CART_ADD_ITEM:
            const prevItems = state.cartItems;
            const item = action.payload;
            const exists = prevItems.find( i => i.data === item.data );

            if( exists ){
                return{
                    ...state,
                    cartItems : [...prevItems]
                }
            }else{
                return {
                    ...state,
                    cartItems : [...prevItems , item]
                }
             }

        case CART_REMOVE_ITEM:
             return{
                 ...state,
                 cartItems: state.cartItems.filter((i) => i.data !== action.payload)
             }
        default:
            return state;
    }


}