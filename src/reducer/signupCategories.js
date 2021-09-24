// Constants
import { categories_list } from "../constants/constants";

const initialState = {
    categoriesList: {},
};

const SignUpCategory = (state = initialState, actions) => {
    switch (actions.type) {
        case categories_list:
            return {
                ...state.categoriesList,
                data: actions.payload,
            };
        default:
            return state;
    }
};

export default SignUpCategory;
