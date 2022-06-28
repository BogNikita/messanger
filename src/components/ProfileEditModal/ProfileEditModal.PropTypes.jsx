import PropTypes from 'prop-types';
import ProfileEditModal from './ProfileEditModal';

function ProfileEditModalPropTypes(props) {
  return ProfileEditModal(props);
}

ProfileEditModalPropTypes.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ProfileEditModalPropTypes;
