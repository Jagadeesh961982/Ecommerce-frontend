import { ALL_FEEDBACKS_FAIL, ALL_FEEDBACKS_REQUEST, ALL_FEEDBACKS_SUCCESS, ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, FEEDBACK_DELETE_FAIL, FEEDBACK_DELETE_REQUEST, FEEDBACK_DELETE_RESET, FEEDBACK_DELETE_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SUBMIT_FEEDBACK_FAIL, SUBMIT_FEEDBACK_REQUEST, SUBMIT_FEEDBACK_RESET, SUBMIT_FEEDBACK_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userContants";


export const userLoginRegisterReducer=(state={user:{}},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading:true,
                isAuthenticated:false,
            }
        case USER_LOGOUT_SUCCESS:
            return {
                loading:false,
                isAuthenticated:false,
                user:null,
            }
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload,

            }
       
        case LOAD_USER_FAIL:
            return {
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            }

        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            }
        case USER_LOGOUT_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}

export const profileReducer=(state={},action)=>{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true,
            
            }

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload,
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated:false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}

export const forgotPasswordReducer=(state={},action)=>{
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                message:action.payload,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                success:action.payload,
            }
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}

export const feedbackReducer=(state={feedbacks:[]},action)=>{
    switch(action.type){
        case SUBMIT_FEEDBACK_REQUEST:
        case ALL_FEEDBACKS_REQUEST:
        case FEEDBACK_DELETE_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case SUBMIT_FEEDBACK_SUCCESS:
            return {
                ...state,
                loading:false,
                isSubmitted:action.payload,
            }
        case ALL_FEEDBACKS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                loading:false,
                feedbacks:action.payload.feeds,
            }
        case FEEDBACK_DELETE_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:action.payload
            }
        case SUBMIT_FEEDBACK_RESET:
            return{
                ...state,
                loading:false,
                isSubmitted:false,
            }
        case FEEDBACK_DELETE_RESET:
            return {
                ...state,
                loading:false,
                isDeleted:false,
            }
        case SUBMIT_FEEDBACK_FAIL:
        case ALL_FEEDBACKS_FAIL:
        case FEEDBACK_DELETE_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}


// Admin reducers
export const allUsersReducer=(state={users:[],user:{}},action)=>{
    switch(action.type){
        case ALL_USERS_REQUEST:
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading:false,
                users:action.payload.users,
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading:false,
                user:action.payload,
            }
        case ALL_USERS_FAIL:
        case USER_DETAILS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}

export const userReducer=(state={},action)=>{
    switch(action.type){
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isUpdated:action.payload,
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isDeleted:action.payload.success,
                message:action.payload.message,
            }
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,
            }
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated:false,
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted:false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}



