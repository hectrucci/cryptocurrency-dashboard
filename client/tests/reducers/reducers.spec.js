import {
    chartData,
    calculator,
    tableData,
} from '../../src/reducers/reducers';

describe('testing chartData reducer', () => {
    it ('should set a new price', () => {
        const state = {
            series: [
                {
                    name: 'BTC to USD',
                    data: [],
                }
            ],
        };
        const action = {
            type: 'ADD_CRYPTO_DATA',
            seriesName: 'BTC to USD',
            price: 2,
            series: [
                {
                    name: 'BTC to USD',
                    data: [],
                },
            ],
        };

        const result = chartData(state, action);
        expect(result.series[0].data[0][1]).toEqual(2);

    });
});

describe('testing calculator reducer', () => {
    it ('should set the normal currency', () => {
        const state = {};
        const action = {
            type:'UPDATE_NORMAL_SELECTION',
            selectedCurrency: 'USD'
        };

        const result = calculator(state, action);
        expect(result.selectedNormalCurrency).toEqual('USD');
    });

    it ('should set the crypto currency', () => {
        const state = {};
        const action = {
            type:'UPDATE_CRYPTO_SELECTION',
            selectedCurrency: 'BTC'
        };

        const result = calculator(state, action);
        expect(result.selectedCryptoCurrency).toEqual('BTC');
    });
});
