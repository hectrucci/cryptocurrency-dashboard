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
    socket = openSocket('//localhost:5000');
};

const disconnect = () => {
    if (socket) {
        socket.disconnect();
    }
};

export  { subscribeToCryptoStream, disconnect, connect, };
