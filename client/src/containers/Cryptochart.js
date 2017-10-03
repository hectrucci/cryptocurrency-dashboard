
import ReactHighcharts from 'react-highcharts';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        config: state.chartData,
    };
};

const Cryptochart = connect(
    mapStateToProps,
)(ReactHighcharts);

export default Cryptochart;
