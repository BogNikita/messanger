import PropTypes from 'prop-types';
import AutoCompleteMessage from '../AutoCompleteMessage';

function AutoCompleteMessagePropTypes(props) {
  return AutoCompleteMessage(props);
}

AutoCompleteMessagePropTypes.propTypes = {
  index: PropTypes.number.isRequired,
  removeItem: PropTypes.func.isRequired,
  props: PropTypes.object,
};

export default AutoCompleteMessagePropTypes;
