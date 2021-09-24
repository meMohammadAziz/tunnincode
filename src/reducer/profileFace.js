// Constants
import { profile_face } from "../constants/constants";

const initialState = {
    profileFace: {},
};

const ProfileFace = (state = initialState, actions) => {
    switch (actions.type) {
        case profile_face:
            return {
                ...state.profileFace,
                data: actions.payload,
            };
        default:
            return state;
    }
};

export default ProfileFace;
