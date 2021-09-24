// Constants
import { getHeader } from "../constants/constants";

const initialState = {
    getHeader: {},
};

const Header = (state = initialState, actions) => {
    switch (actions.type) {
        case getHeader:
            return {
                ...state.getHeader,
                data: actions.payload,
            };
        default:
            return state;
    }
};

export default Header;
