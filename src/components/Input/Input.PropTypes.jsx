import PropTypes from 'prop-types';
import Input from './Input';

function InputPropTypes(props) {
  return <Input {...props} />;
}

InputPropTypes.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  errors: PropTypes.string,
  defaultValue: PropTypes.string,
  widthInput: PropTypes.string,
  minWidth: PropTypes.string,
};

InputPropTypes.defaultProps = {
  type: 'text'
};

export default InputPropTypes;
