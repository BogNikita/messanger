import PropTypes from 'prop-types';
import DialogSettings from '../DialogSettings';

function DialogSettingsPropTypes(props) {
  return DialogSettings(props);
}

DialogSettingsPropTypes.propTypes = {
  modalIsOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default DialogSettingsPropTypes;
