import { Component } from 'react';
import './CurrencyCalculator.scss';

class CurrencyCalculator extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        const { _currencyValue, _currencySelector } = this.refs;
        this.props.onCurrencyChange(_currencyValue.value, _currencySelector.value);
    }

    componentDidMount() {
        this.refs._currencyValue.value = 1;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.total >= 0) {
            this.setInputValue(nextProps.total);
        }
    }

    setInputValue(newValue) {
        this.refs._currencyValue.value = newValue;
    }

    render() {
        return (
            <div className="row form-group currency-calculator">
                <div className="col-xs-6">
                    <input type="number"
                           min="0"
                           onChange={this.onChange}
                           className="form-control"
                           ref="_currencyValue"
                           disabled={this.props.inputDisabled} />
                </div>
                <div className="col-xs-6">
                    <select ref="_currencySelector"
                            id={this.props.selectId}
                            className="form-control"
                            onChange={this.onChange}>
                        {this.props.currencies.map((currency) =>
                                <option key={currency}
                                        value={currency}>
                                    {currency}
                                </option>
                            )}
                    </select>
                </div>
            </div>
        );
    }
}

export default CurrencyCalculator;
