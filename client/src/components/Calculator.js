import CurrencyCalculator from './CurrencyCalculator';
import './Calculator.scss';

let currentValue = 0;

const Calculator = ({
    total,
    onCryptoCurrencyChange = f => f,
    onNormalCurrencyChange = f => f,
}) => {
    const onNormalChange = (totalValue, currentSelection) => {
        onNormalCurrencyChange(currentValue, currentSelection);
    };

    const onCryptoChange = (cryptoCurrentValue, currentSelection) => {
        currentValue = cryptoCurrentValue;
        onCryptoCurrencyChange(currentValue, currentSelection);
    };

    return (
        <section className="panel calculator">
            <div className="panel-heading calculator-title">
                Calculator
            </div>
            <div className="panel-body">
                <CurrencyCalculator currencies={['USD', 'EUR']}
                                    selectId="normalCurrencies"
                                    onCurrencyChange={onNormalChange.bind(this)}
                                    inputDisabled={true}
                                    total={total} />
                <CurrencyCalculator currencies={['BTC', 'ETH']}
                                    selectId="cryptoCurrencies"
                                    onCurrencyChange={onCryptoChange.bind(this)} />
            </div>
        </section>
    );
}

export default Calculator;
