import ActionTypes from "../actions/actionTypes";

const initialState = {
    socketStatus: 0,
    channelId: '',
    bids: {},
    asks: {},
    maxBid: 0,
    maxAsk: 0,
    chartProp: 'total',
    columnOrder: 'order1',
    precision: 0
};

const getInitialState = () => {
    return { ...initialState, ...restoreState(), socketStatus: 0 };
}

const OrderBookReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ActionTypes.SETSOCKETSTATUS:
            return Object.assign({}, state, { socketStatus: action.data });
        case ActionTypes.BOOKSNAPSHOT:
            var total = 0;
            var bids = action.data[1].reduce((a, el, i) => {
                total += el[2];
                el[2] > 0 && (a[el[0]] = { count: el[1], amount: +parseFloat(el[2]).toFixed(5 - state.precision), order: i, total: +parseFloat(total).toFixed(5 - state.precision) });
                return a;
            }, {});
            total = 0;
            var asks = action.data[1].reduce((a, el, i) => {
                total += Math.abs(el[2]);
                el[2] < 0 && (a[el[0]] = { count: el[1], amount: +parseFloat(Math.abs(el[2])).toFixed(5 - state.precision), order: i, total: +parseFloat(total).toFixed(5 - state.precision) });
                return a;
            }, {});
            var newState = { bids: { ...bids }, asks: { ...asks }, maxBid: Math.max(...Object.entries(bids).map(el => el[1].total)), maxAsk: Math.max(...Object.entries(asks).map(el => el[1][state.chartProp])) };
            return { ...state, ...newState };
        case ActionTypes.BIDUPDATE:
            var priceLevel = action.data[1][0];
            var count = action.data[1][1];
            var amount = +parseFloat(action.data[1][2]).toFixed(5 - state.precision);
            var bids = { ...updateEntry({ ...state.bids }, priceLevel, count, amount, state.precision) };
            return { ...state, bids, maxBid: Math.max(...Object.entries(bids).map(el => el[1][state.chartProp])) };
        case ActionTypes.ASKUPDATE:
            var priceLevel = action.data[1][0];
            var count = action.data[1][1];
            var amount = +parseFloat(Math.abs(action.data[1][2])).toFixed(5 - state.precision);
            var asks = { ...updateEntry({ ...state.asks }, priceLevel, count, amount, state.precision) };
            return { ...state, asks, maxAsk: Math.max(...Object.entries(asks).map(el => el[1][state.chartProp])) };
        case ActionTypes.CHANGECHARTPROP:
            return { ...state, chartProp: action.data };
        case ActionTypes.CHANGECOLUMNORDER:
            return { ...state, columnOrder: action.data };
        case ActionTypes.SETPRECISION:
            return { ...state, precision: state.precision + (action.data && 1 || -1) };
        case ActionTypes.CLEARSNAPSHOT:
            return { ...state, bids: {}, asks: {} }
        default:
            return state;
    }
}

const updateEntry = (section, priceLevel, count, amount, precision) => {
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
        el[1].total = +parseFloat(total).toFixed(5 - precision);
    });
    return section;
}

const restoreState = () => {
    return JSON.parse(sessionStorage.getItem('orderBook') || '{}');
}

export default OrderBookReducer;