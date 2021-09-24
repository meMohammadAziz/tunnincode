// Constants
import { getPayouts } from "../constants/constants";

const initialState = {
    payout: {},
};

const Payouts = (state = initialState, actions) => {
    switch (actions.type) {
        case getPayouts:
            return {
                ...state.payout,
                data: actions.payload,
            };
        default:
            return state;
    }
};

export default Payouts;
