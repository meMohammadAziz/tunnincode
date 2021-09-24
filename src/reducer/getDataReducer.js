const initialState = {
    dataState: {},
};

const GetDataReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case "fetchLocalData":
            return {
                ...state.dataState,
                dataState: actions.payload,
            };
        default:
            return state;
    }
};

export default GetDataReducer;
