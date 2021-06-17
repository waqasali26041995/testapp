const initialState = "";
const ChangeHeaderTitle = (state = initialState, action) => {
    switch(action.type) {
        case "UpdateTitle": return state = action.payload;
        default: return state;
    }
}

export default ChangeHeaderTitle;