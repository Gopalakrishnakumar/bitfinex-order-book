import ActionTypes from "../actions/actionTypes";

const initialState = {
    message: "",
    socketStatus: 0,
    channelId: '',
    bids: {},
    asks: {}
};

const getInitialState = () => {
    return { ...initialState, ...restoreState() };
}

const OrderBookReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ActionTypes.GREET:
            return Object.assign({}, state, { message: action.data });
        case ActionTypes.SOCKET:
            return Object.assign({}, state, { socketStatus: action.data });
        case ActionTypes.BOOKSNAPSHOT:
            var total = 0;
            var bids = action.data[1].reduce((a, el, i) => {
                total += el[2];
                el[2] > 0 && (a[el[0]] = { count: el[1], amount: +parseFloat(el[2]).toFixed(4), order: i, total: +parseFloat(total).toFixed(4) });
                return a;
            }, {});
            total = 0;
            var asks = action.data[1].reduce((a, el, i) => {
                total += Math.abs(el[2]);
                el[2] < 0 && (a[el[0]] = { count: el[1], amount: +parseFloat(Math.abs(el[2])).toFixed(4), order: i, total: +parseFloat(total).toFixed(4) });
                return a;
            }, {});
            var newState = { bids: { ...bids }, asks: { ...asks } };
            saveState(newState);
            return { ...state, ...newState };
        case ActionTypes.BIDUPDATE:
            var priceLevel = action.data[1][0];
            var count = action.data[1][1];
            var amount = +parseFloat(action.data[1][2]).toFixed(4);
            var newState = { asks: state.asks, bids: { ...updateEntry({ ...state.bids }, priceLevel, count, amount) } };
            saveState(newState);
            return { ...state, ...newState };
        case ActionTypes.ASKUPDATE:
            var priceLevel = action.data[1][0];
            var count = action.data[1][1];
            var amount = +parseFloat(Math.abs(action.data[1][2])).toFixed(4);
            var newState = { bids: state.bids, asks: { ...updateEntry({ ...state.asks }, priceLevel, count, amount) } };
            saveState(newState);
            return { ...state, ...newState };
        default:
            return state;
    }
}

const updateEntry = (section, priceLevel, count, amount) => {
    if (count > 0) {
        if (section[priceLevel]) {
            section[priceLevel] = { count, amount, ...section[priceLevel] };
        } else {
            section[priceLevel] = { count, amount, order: Object.keys(section).length }
        }
    } else {
        delete section[priceLevel];
    }
    let total = 0;
    Object.entries(section).sort((a, b) => a[1].order - b[1].order).forEach((el, i) => {
        total += Math.abs(el[1].amount);
        el[1].total = +parseFloat(total).toFixed(4);
    });
    return section;
}

const saveState = (state) => {
    sessionStorage.setItem('orderBook', JSON.stringify(state));
}

const restoreState = () => {
    return JSON.parse(sessionStorage.getItem('orderBook') || '{}');
}

export default OrderBookReducer;