export const Loader = (isDataLoaded) => {
    return {
        type: "IsDataLoaded",
        payload:isDataLoaded
    }
}