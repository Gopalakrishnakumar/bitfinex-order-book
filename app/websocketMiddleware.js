const wssUrl = 'wss://api-pub.bitfinex.com/ws/2';

let timer;

const socketRegister = props => {
    const subscribePacket = {
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
        prec: 'P' + (props.precision || 0)
    };
    const wss = new WebSocket(wssUrl);
    wss.onmessage = msg => {
        let data = JSON.parse(msg.data);
        if (!data.event) {
            if (data[1] == 'hb') {
                return;
            }
            if (typeof data[1][0] === 'object') {
                return props.addSnapshot(data);
            }
            return data[1][2] > 0 && props.updateBid(data) || props.updateAsk(data);
        }
    }

    wss.onopen = () => {
        clearTimeout(timer);
        console.log('socket opened successfully');
        props.setSocketStatus(1);
        wss.send(JSON.stringify(subscribePacket));
    }

    wss.onclose = e => {
        console.log('socket closed, reason:', e.reason);
        props.setSocketStatus(-1);
    }

    wss.onerror = e => {
        console.error('ERROR occured while connecting socket! Details:', e.message);
        if (wss.readyState == wss.OPEN) {
            wss.close();
        }
        if (!timer) {
            timer = setTimeout(() => {
                props.setSocketStatus(0);
                socketRegister(props);
            }, 1000);
        }
    }

    return wss;
}

export default socketRegister;