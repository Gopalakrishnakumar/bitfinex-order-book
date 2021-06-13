import ActionTypes from "./actionTypes";

const greet = () => {
    return dispatch => {
        dispatch({ type: ActionTypes.GREET, data: "Hello" });
    }
}

export default { greet };