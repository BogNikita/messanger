import PropTypes from 'prop-types';
import Button from './Button';

function ButtonPropTypes(props) {
  return <Button {...props} />;
}

ButtonPropTypes.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  style: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
};

export default ButtonPropTypes;
