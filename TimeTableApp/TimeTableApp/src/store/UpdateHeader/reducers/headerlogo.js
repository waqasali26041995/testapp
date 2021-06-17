const initialState = "/logo.png";
const ChangeHeaderlogo = (state = initialState, action) => {
    switch(action.type) {
        case "UpdateImage": return state = action.payload;
        default: return state;
    }
}

export default ChangeHeaderlogo;