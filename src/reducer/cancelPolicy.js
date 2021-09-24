// Constants
import { cancel_policy } from "../constants/constants";

const initialState = {
    cancelPolicy: {},
};

const CancelPolicy = (state = initialState, actions) => {
    switch (actions.type) {
        case cancel_policy:
            return {
                ...state.cancelPolicy,
                data: actions.payload,
            };
        default:
            return state;
    }
};

export default CancelPolicy;
