const addCryptoData = ({ seriesName, price }) => {
    return {
        type: 'ADD_CRYPTO_DATA',
        seriesName,
        price,
    };
};

const calculateTotal = (currentValue) => {
    return {
        type: 'CALCULATE_TOTAL',
        currentValue,
    };
};

const updateNormalSelection = (selectedCurrency) => {
    return {
        type: 'UPDATE_NORMAL_SELECTION',
        selectedCurrency,
    }
};

const updateCryptoSelection = (selectedCurrency) => {
    return {
        type: 'UPDATE_CRYPTO_SELECTION',
        selectedCurrency,
    }
};

const updateCryptoPrices = ({ from, to, price }) => {
    return {
        type: 'UPDATE_CRYPTO_PRICES',
        from,
        to,
        price,
    };
};

const updateCryptoPricesFromRequest = ({ BTC, ETH }) => {
    return {
        type: 'UPDATE_CRYPTO_PRICES_FROM_REQUEST',
        BTC,
        ETH,
    };
};

const updateTables = ({ BTC, ETH }) => {
    return {
        type: 'UPDATE_TABLES',
        BTC,
        ETH,
        time: new Date().toLocaleString(),
    };
};

export {
    addCryptoData,
    calculateTotal,
    updateNormalSelection,
    updateCryptoSelection,
    updateCryptoPrices,
    updateCryptoPricesFromRequest,
    updateTables,
};
