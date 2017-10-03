const fetch = require('isomorphic-fetch');

const service = {};

service.getCryptoCurrencies = ({ from, to }) => {
    const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${from}&tsyms=${to}`;

    return fetch(url)
        .then((response) => {
            const status = response.status;

            if (status >= 400) {
                res.status(status).send('Unexpexted Error');
            }

            return response.json();
        });
};

module.exports = service;
