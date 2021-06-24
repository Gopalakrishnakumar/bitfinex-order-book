import ActionTypes from './actions/actionTypes';

const wssUrl = 'wss://api-pub.bitfinex.com/ws/2';
const subscribePacket = {
    event: 'subscribe',
    channel: 'book',
    symbol: 'tBTCUSD'
    //freq: 'F1'
};

let timer;

const socketRegister = store => {
    const wss = new WebSocket(wssUrl);
    wss.onmessage = msg => {
        let data = JSON.parse(msg.data);
        if (!data.event) {
            if(data[1] == 'hb'){
                return;
            }
            if (typeof data[1][0] === 'object') {
                return store.dispatch({ type: ActionTypes.BOOKSNAPSHOT, data: data });
            }
            return store.dispatch({ type: data[1][2] > 0 && ActionTypes.BIDUPDATE || ActionTypes.ASKUPDATE, data });
        }
    }

    wss.onopen = () => {
        clearTimeout(timer);
        console.log('socket opened successfully');
        store.dispatch({ type: ActionTypes.SOCKET, data: 1 });
        wss.send(JSON.stringify(subscribePacket));
    }

    wss.onclose = e => {
        console.log('socket closed, reason:', e.reason);
        store.dispatch({ type: ActionTypes.SOCKET, data: -1 });
        if (!timer) {
            timer = setTimeout(() => {
                store.dispatch({ type: ActionTypes.SOCKET, data: 0 });
                socketRegister();
            }, 1000);
        }
    }

    wss.onerror = e => {
        console.error('ERROR occured while connecting socket! Details:', e.message);
        if (wss.readyState == wss.OPEN) {
            wss.close();
        }
    }
}

export default socketRegister;