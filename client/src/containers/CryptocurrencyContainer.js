import Cryptocurrency from '../components/Cryptocurrency';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    const selectedNormalCurrency = state.calculator.selectedNormalCurrency;

    return {
        value: state.calculator[`${ownProps.cryptocurrency}/${selectedNormalCurrency}`],
        selectedNormalCurrency,
    };
};

const CryptocurrencyContainer = connect(
    mapStateToProps,
)(Cryptocurrency);

export default CryptocurrencyContainer;
