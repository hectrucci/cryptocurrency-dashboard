import { getNewChartSeries, getNewChartConfig } from '../services/chartService';

const chartData = (state = getNewChartConfig(), action) => {
    switch (action.type) {
        case 'ADD_CRYPTO_DATA':
            const series = getNewChartSeries(
                action.seriesName,
                action.price,
                state.series,
            );

            return {
                ...state,
                series,
            };

        default:
            return state;
    }
};

const calculator = (state = {}, action) => {
    let total;
    switch(action.type) {
        case 'CALCULATE_TOTAL':
            const currentValue = action.currentValue;
            total = state[`${state.selectedCryptoCurrency}/${state.selectedNormalCurrency}`] * currentValue;

            return {
                ...state,
                total,
                currentValue,
            };
        case 'UPDATE_NORMAL_SELECTION':
            return {
                ...state,
                selectedNormalCurrency: action.selectedCurrency,
            };
        case 'UPDATE_CRYPTO_SELECTION':
            return {
                ...state,
                selectedCryptoCurrency: action.selectedCurrency,
            };
        case 'UPDATE_CRYPTO_PRICES':
            const updatedCurrency = `${action.from}/${action.to}`;
            const newPrice = action.price;

            if (updatedCurrency === `${state.selectedCryptoCurrency}/${state.selectedNormalCurrency}`) {
                total = newPrice * state.currentValue;
                return {
                    ...state,
                    [updatedCurrency]: newPrice,
                    total,
                };
            }

            return {
                ...state,
                [updatedCurrency]: newPrice,
            };
        case 'UPDATE_CRYPTO_PRICES_FROM_REQUEST':
            const BTC = action.BTC;
            const ETH = action.ETH;

            const updatedCurrencies = {
                'BTC/USD': BTC.USD,
                'BTC/EUR': BTC.EUR,
                'ETH/USD': ETH.USD,
                'ETH/EUR': ETH.EUR,
            };

            const selectedConversion = `${state.selectedCryptoCurrency}/${state.selectedNormalCurrency}`;
            total = updatedCurrencies[selectedConversion] * state.currentValue;

            return {
                ...state,
                ...updatedCurrencies,
                total,
            }
        default:
            return state;
    }
};

const tableData = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_TABLES':
            const BTC = action.BTC;
            const ETH = action.ETH;
            const time = action.time;

            const updatedBTC = {
                time,
                'USD': BTC.USD,
                'EUR': BTC.EUR,
            };

            const updatedETH = {
                time,
                'USD': ETH.USD,
                'EUR': ETH.EUR,
                'BTC': ETH.BTC,
            }

            return {
                ...state,
                BTC: [updatedBTC, ...state.BTC].slice(-10),
                ETH: [updatedETH, ...state.ETH].slice(-10),
            }
        default:
            return state;
    }
};

export { chartData, calculator, tableData };
