import PropTypes from 'prop-types';
import DialogIsOver from './DialogIsOver';

function DialogIsOverPropTypes(props) {
  return DialogIsOver(props);
}

DialogIsOverPropTypes.propTypes = {
  timestamp: PropTypes.number.isRequired,
  chatRate: PropTypes.number.isRequired,
};

export default DialogIsOverPropTypes;
