import { ADD_TO_CART, ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_RESET, ADD_TO_CART_SUCCESS, CLEAR_ERRORS, GET_CART_ITEMS_FAIL, GET_CART_ITEMS_REQUEST, GET_CART_ITEMS_SUCCESS, REMOVE_ALL_CART_ITEMS_FAIL, REMOVE_ALL_CART_ITEMS_REQUEST, REMOVE_ALL_CART_ITEMS_SUCCESS, REMOVE_CART_ITEM_FAIL, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_RESET, REMOVE_CART_ITEM_SUCCESS, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

// export const cartReducer=(state={cartItems:[],shippingInfo:{}},action)=>{
//     switch (action.type){
//         case ADD_TO_CART:
//             const item=action.payload;
//             const isItemExist=state.cartItems.find(i=>i.product===item.product);
//             if(isItemExist){
//                 return {
//                     ...state,
//                     cartItems:state.cartItems.map((i)=>i.product===isItemExist.product?item:i)
//                 }

//             }else{
//                 return {
//                     ...state,
//                     cartItems:[...state.cartItems,item]
//                 }
//             }
//         case REMOVE_FROM_CART:
//             return {
//                 ...state,
//                 cartItems:state.cartItems.filter(i=>i.product!=action.payload)
//             }
//         case SAVE_SHIPPING_INFO:
//             return {
//                 ...state,
//                 shippingInfo:action.payload,
//             }

//         default:
//             return state;

//     }
// }

export const cartReducer = (state = { cartItems: [],shippingInfo:{} }, action) => {
    switch (action.type){
        case GET_CART_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_CART_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
            }
        case GET_CART_ITEMS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo:action.payload,
            }
        default:
            return state;
    }
}

export const cartItemReducer =(state={cartItem:{}},action)=>{
    switch (action.type){
        case ADD_TO_CART_REQUEST:
        case REMOVE_CART_ITEM_REQUEST:
        case REMOVE_ALL_CART_ITEMS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            }
        case REMOVE_ALL_CART_ITEMS_SUCCESS:
            return state;
        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
            }
        case ADD_TO_CART_RESET:
            return {
                ...state,
                loading: false,
                message: null,
            }
        case REMOVE_CART_ITEM_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            }
        case ADD_TO_CART_FAIL:
        case REMOVE_CART_ITEM_FAIL:
        case REMOVE_ALL_CART_ITEMS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
};