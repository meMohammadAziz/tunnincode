// Constants
import { agora_key } from "../constants/constants";

const initialState = {};

const PatchAPI = (state = initialState, actions) => {
    switch (actions.type) {
        case agora_key:
            return {
                ...state,
                agoraRes: actions.payload,
            };
        default:
            return state;
    }
};

export default PatchAPI;
