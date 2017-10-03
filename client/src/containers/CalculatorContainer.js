
import Calculator from '../components/Calculator';
import { calculateTotal, updateNormalSelection, updateCryptoSelection } from '../actions/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        total: state.calculator.total,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNormalCurrencyChange: (currentValue, selectedCurrency) => {
            dispatch(updateNormalSelection(selectedCurrency));
            dispatch(calculateTotal(currentValue));
        },
        onCryptoCurrencyChange: (currentValue, selectedCurrency) => {
            dispatch(updateCryptoSelection(selectedCurrency));
            dispatch(calculateTotal(currentValue));
        },
    };
};

const CalculatorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Calculator);

export default CalculatorContainer;
