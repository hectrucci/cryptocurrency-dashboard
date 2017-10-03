import { Component } from 'react';
import './Cryptocurrency.scss';

const Cryptocurrency = ({
    cryptocurrency,
    value,
    selectedNormalCurrency,
}) => <span className="crypto-currency">1 {cryptocurrency} = {value} {selectedNormalCurrency}</span>;

export default Cryptocurrency;
