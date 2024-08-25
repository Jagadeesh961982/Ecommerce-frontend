import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { productsReducer, productDetailsReducer, newReviewReducer, newProductReducer, adminProductReducer, productReviewsReducer, adminReviewReducer} from "./reducers/productReducer";
import {allUsersReducer, feedbackReducer, forgotPasswordReducer, profileReducer, userLoginRegisterReducer, userReducer} from "./reducers/userReducer"
import { allOrdersReducer, getMyOrdersReducer, newOrderReducer, orderReducer } from "./reducers/orderReducer";
import { cartItemReducer, cartReducer } from "./reducers/cartReducer";


const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    userLoginRegister:userLoginRegisterReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    allCartItems:cartReducer,
    cartItem:cartItemReducer,
    newOrder:newOrderReducer,
    myOrders:getMyOrdersReducer,
    review:newReviewReducer,
    newProduct:newProductReducer,
    adminProduct:adminProductReducer,
    allOrders:allOrdersReducer,
    adminOrder:orderReducer,
    allUsers:allUsersReducer,
    user:userReducer,
    productReviews:productReviewsReducer,
    adminReview:adminReviewReducer,
    userFeedback:feedbackReducer,

});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{}
    },
    
    
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
});

export default store;