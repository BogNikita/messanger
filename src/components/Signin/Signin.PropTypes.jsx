import PropTypes from 'prop-types';
import Signin from './Signin';

function SigninPropTypes(props) {
  return Signin(props);
}

SigninPropTypes.propTypes = {
  fieldLogin: PropTypes.string.isRequired,
  fieldPassword: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string.isRequired,
};

export default SigninPropTypes;
