import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

function DropdownPropTypes(props) {
  return Dropdown(props);
}
DropdownPropTypes.propTypes = {
  elements: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DropdownPropTypes;
