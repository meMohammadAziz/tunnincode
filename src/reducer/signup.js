// Constants
import { sign_up } from "../constants/constants";

const initialState = {
    signUp: {},
};

const SignUp = (state = initialState, actions) => {
    switch (actions.type) {
        case sign_up:
            return {
                ...state.signUp,
                data: actions.payload,
            };
        default:
            return state;
    }
};

export default SignUp;
