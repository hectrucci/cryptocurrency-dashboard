const express = require('express');
const path = require('path');
const cryptoCurrencyService = require('./cryptocurrency_service');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cryptoServiceSocket = require('socket.io-client')('https://streamer.cryptocompare.com/');
const CCC = require('./ccc-streamer-utilities');
const isNotProductionEnv = process.env.NODE_ENV !== 'production';
const subscription = [
	'5~CCCAGG~BTC~USD',
	'5~CCCAGG~BTC~EUR',
	'5~CCCAGG~ETH~USD',
	'5~CCCAGG~ETH~EUR',
	'5~CCCAGG~ETH~BTC',
];

cryptoServiceSocket.emit('SubAdd', {subs:subscription} );

io.on('connection', (socket) => {
	if (isNotProductionEnv) {
		console.log('User connected')
	}

	socket.on('disconnect', () =>
		isNotProductionEnv ? console.log('User disconnected') : null
	);
});

cryptoServiceSocket.on('m', (message) => {
	const messageType = message.substring(0, message.indexOf('~'));

	if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
		const res = CCC.CURRENT.unpack(message);

		if (res.PRICE) {
			if (isNotProductionEnv) {
				console.log(new Date());
			}
			io.emit('cryptoChange', res);
		}
	}
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/cryptocurrencies/', (req, res) => {
    cryptoCurrencyService.getCryptoCurrencies(req.query)
        .then((cryptoCurrencies) => {
             res.json(cryptoCurrencies);
        })
        .catch((error) => res.error(error));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port);
console.log(`Application listening on ${port}`);
