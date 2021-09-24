// Constants
import { getEarnings } from "../constants/constants";

const initialState = {
    earnings: {},
};

const Earnings = (state = initialState, actions) => {
    switch (actions.type) {
        case getEarnings:
            return {
                ...state.earnings,
                data: actions.payload,
            };
        default:
            return state;
    }
};

export default Earnings;
