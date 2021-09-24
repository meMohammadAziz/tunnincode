// Constants
import { setting_sidebar } from "../constants/constants";

const initialState = {
    settingsSidebar: {},
};

const SettingsSideBar = (state = initialState, actions) => {
    switch (actions.type) {
        case setting_sidebar:
            return {
                ...state.settingsSidebar,
                sidebar: actions.payload,
            };
        default:
            return state;
    }
};

export default SettingsSideBar;
