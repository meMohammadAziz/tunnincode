// Constants
import {
    get_auth,
    create_user,
    create_session,
    cancel_session_api,
    user_contact_support,
    update_created_session_api,
    user_profile_pic,
    reg_step_1,
    reg_step_2,
} from "../constants/constants";

const initialState = {};

const PostFetchReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case get_auth:
            return {
                ...state,
                userLogged: actions.payload,
                userLoginStatus: actions.status,
            };
        case create_user:
            return {
                ...state,
                userCreated: actions.payload,
                userCreatedStatus: actions.status,
            };
        case create_session:
            return {
                ...state,
                createdSession: actions.payload,
                createdSessionStatus: actions.status,
            };
        case update_created_session_api:
            return {
                ...state,
                updateCreatedSession: actions.payload,
                updateCreatedSessionStatus: actions.status,
            };
        case cancel_session_api:
            return {
                ...state,
                cancelledSession: actions.payload,
                cancelledStatus: actions.status,
            };
        case user_contact_support:
            return {
                ...state,
                userContactSupoort: actions.payload,
                userContactStatus: actions.status,
            };
        case user_profile_pic:
            return {
                ...state,
                userProfilePayload: actions.payload,
                userProfileStatus: actions.status,
            };
        case reg_step_1:
            return {
                ...state,
                regStep1: actions.payload,
                regStep1Status: actions.status,
            };
        case reg_step_2:
            return {
                ...state,
                regStep2: actions.payload,
                regStep2Status: actions.status,
            };
        default:
            return state;
    }
};

export default PostFetchReducer;
