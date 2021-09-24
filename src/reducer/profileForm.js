// Constants
import { profile_form } from "../constants/constants";

const initialState = {
    profileForm: {},
};

const ProfileForm = (state = initialState, actions) => {
    switch (actions.type) {
        case profile_form:
            return {
                ...state.profileForm,
                data: actions.payload,
            };
        default:
            return state;
    }
};

export default ProfileForm;
