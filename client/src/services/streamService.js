import openSocket from 'socket.io-client';

let socket;

const subscribeToCryptoStream = (cb) => {
    if (socket) {
        socket.on('cryptoChange', (cryptocurrencies) => cb(cryptocurrencies));
    }
};

const connect = () => {
    if (socket) {
        socket.disconnect();
    }

    let url;

    if (process.env.NODE_ENV === 'production') {
        url = window.location.hostname;
    } else {
        url = `//localhost:${process.env.PORT}`;
    }

    socket = openSocket(url);
};

const disconnect = () => {
    if (socket) {
        socket.disconnect();
    }
};

export  {
    subscribeToCryptoStream,
    disconnect,
    connect,
};
