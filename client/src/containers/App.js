// Libraries
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
    createStore,
    combineReducers,
} from 'redux';

// reducers
import {
    chartData,
    calculator,
    tableData,
} from '../reducers/reducers';

// actions
import {
    addCryptoData,
    updateCryptoPrices,
    updateCryptoPricesFromRequest,
    updateTables,
} from '../actions/actions';

// Componets & Containers
import CalculatorContainer from './CalculatorContainer';
import Cryptochart from './Cryptochart';
import CryptocurrencyContainer from './CryptocurrencyContainer';
import CryptoTableContainer from './CryptoTableContainer';

// Services
import {
    getNewChartConfig,
    getNewChartSeries,
    fetchCryptoCurrencies,
} from '../services/chartService';

import {
    subscribeToCryptoStream,
    disconnect,
    connect,
} from '../services/streamService';

// styles
import './App.scss';

// store initialization
const initialState = {
    chartData: getNewChartConfig(),
    calculator: {
        selectedNormalCurrency: 'USD',
        selectedCryptoCurrency: 'BTC',
        'BTC/USD': 0,
        'BTC/EUR': 0,
        'ETH/USD': 0,
        'ETH/EUR': 0,
        total: 0,
        currentValue: 1,
    },
    tableData: {
        BTC: [],
        ETH: [],
    },
};

let store = createStore(
    combineReducers({
        chartData,
        calculator,
        tableData,
    }),
    initialState,
);

window.React = React;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
        };
    }

    componentDidMount() {
        this.connect();
        window.addEventListener('beforeunload', this.disconnect);
    }

    componentWillUnmount() {
        this.disconnect();
    }

    connect() {
        if (!this.state.connected) {
            this.fetchPrices(this.startCryptoStream.bind(this));
            this.startCryptoFetch();
            this.setState({
                connected: true,
            });
            console.log('connected');
        }
    }

    disconnect() {
        if (this.state.connected) {
            clearInterval(this.fetchCryptoCurrenciesFunc);
            disconnect();
            this.setState({
                connected: false,
            });
            console.log('disconnected');
        }
    }

    onCryptoStream(cryptocurrencies) {
        const from = cryptocurrencies.FROMSYMBOL;
        const to = cryptocurrencies.TOSYMBOL;
        const seriesName = `${from} to ${to}`;
        const price = cryptocurrencies.PRICE;

        store.dispatch(addCryptoData({seriesName, price}));
        store.dispatch(updateCryptoPrices({from, to, price }));
    }

    startCryptoFetch() {
        this.fetchCryptoCurrenciesFunc = setInterval(() => {
            this.fetchPrices();
        }, 10000);
    }

    startCryptoStream() {
        connect();
        subscribeToCryptoStream((cryptocurrencies) => {
            this.onCryptoStream(cryptocurrencies);
        });
    }

    fetchPrices(cb) {
        fetchCryptoCurrencies(['BTC', 'ETH'], ['USD', 'EUR', 'BTC'])
            .then((cryptocurrencies) => {
                store.dispatch(updateTables(cryptocurrencies));
                if (cb) {
                    store.dispatch(updateCryptoPricesFromRequest(cryptocurrencies));
                    cb();
                }
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <div className="container app">
                <h1 className="app-title">Cryptocurrency Dashboard</h1>
                <div className="row">
                    <section className="col-sm-7">
                        <Cryptochart />
                    </section>
                    <div className="col-sm-5">
                        <CalculatorContainer />
                    </div>
                </div>
                <section className="row crypto-currencies">
                    <div className="col-sm-6">
                        <CryptocurrencyContainer cryptocurrency="BTC"/>
                    </div>
                    <div className="col-sm-6">
                        <CryptocurrencyContainer cryptocurrency="ETH"/>
                    </div>
                </section>
                <section className="container">
                    <div className="row form-group">
                        <div className="col-sm-2">
                            <button className="btn btn-primary form-control"
                                    disabled={this.state.connected}
                                    onClick={this.connect.bind(this)}>
                                    Connect
                            </button>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-danger form-control"
                                    disabled={!this.state.connected}
                                    onClick={this.disconnect.bind(this)}>
                                Disconnect
                            </button>
                        </div>
                        <div className="col-sm-3 app-status-container">
                            <span className="app-status">Status: {this.state.connected ? 'Connected' : 'Disconnected'}</span>
                        </div>
                    </div>
                </section>
                <div className="row">
                    <section className="col-sm-5">
                        <CryptoTableContainer columns={['Time','USD', 'EUR']}
                                     filter="BTC"
                                     title="Bitcoin - BTC" />
                    </section>
                    <section className="col-sm-7">
                        <CryptoTableContainer columns={['Time','USD', 'EUR', 'BTC']}
                                              filter="ETH"
                                              title="Etherium - ETH"/>
                    </section>
                </div>
            </div>
        )
    }
}

const appElement = document.querySelector('#app');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    appElement
);
