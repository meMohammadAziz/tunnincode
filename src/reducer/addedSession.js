// Constants
import { added_session } from "../constants/constants";

const initialState = {
    addedNewSession: {},
    editSesion: {},
};

const AddedSession = (state = initialState, actions) => {
    switch (actions.type) {
        case added_session:
            return {
                ...state.addedNewSession,
                addedNewSession: actions.payload,
                editSession: actions.editpayload,
            };
        default:
            return state;
    }
};

export default AddedSession;
