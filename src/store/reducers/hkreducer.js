const defaultState = {
    keywords: (localStorage['hk'] !== undefined ? JSON.parse(localStorage['hk']) : [])
}

function hkReducer(state = defaultState, action) {
    switch (action.type) {
        case "addHk":
            console.log(action)
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}

export default hkReducer;
