import CryptoTable from '../components/CryptoTable';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        cryptocurrencies: state.tableData[ownProps.filter],
    };
};

const CryptoTableContainer = connect(
    mapStateToProps,
)(CryptoTable);

export default CryptoTableContainer;
