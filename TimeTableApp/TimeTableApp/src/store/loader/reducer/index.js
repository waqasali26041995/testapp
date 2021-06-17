const initialState = true;
const DataLoaded = (state = initialState, action) => {
    switch(action.type) {
        case "IsDataLoaded": return state = action.payload;
        default: return state;
    }
}

export default DataLoaded;