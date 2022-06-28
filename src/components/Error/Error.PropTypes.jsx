import PropTypes from 'prop-types';
import Error from './Error';

function ErrorPropTypes(props) {
  return Error(props);
}

ErrorPropTypes.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorPropTypes;
