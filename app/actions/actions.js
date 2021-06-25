import ActionTypes from "./actionTypes";


const changeChartProp = data => dispatch => dispatch({ type: ActionTypes.CHANGECHARTPROP, data });

const changeColumnOrder = data => dispatch => dispatch({ type: ActionTypes.CHANGECOLUMNORDER, data });

const addSnapshot = data => dispatch => dispatch({ type: ActionTypes.BOOKSNAPSHOT, data });

const updateBid = data => dispatch => dispatch({ type: ActionTypes.BIDUPDATE, data });

const updateAsk = data => dispatch => dispatch({ type: ActionTypes.ASKUPDATE, data });

const setSocketStatus = data => dispatch => dispatch({ type: ActionTypes.SETSOCKETSTATUS, data });

const setPrecision = data => dispatch => dispatch({ type: ActionTypes.SETPRECISION, data });

const clearSnapshot = () => dispatch => dispatch({ type: ActionTypes.CLEARSNAPSHOT });

export default {
    changeChartProp,
    changeColumnOrder,
    updateAsk,
    updateBid,
    setSocketStatus,
    addSnapshot,
    setPrecision,
    clearSnapshot
};