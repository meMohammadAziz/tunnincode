// Constants
import { verify_type } from "../constants/constants";

const initialState = {
    verifyData: {},
};

const Verify = (state = initialState, actions) => {
    switch (actions.type) {
        case verify_type:
            return {
                ...state.verify,
                data: actions.payload,
            };
        default:
            return state;
    }
};

export default Verify;
