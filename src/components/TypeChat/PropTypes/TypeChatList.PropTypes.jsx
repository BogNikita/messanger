import PropTypes from 'prop-types';
import TypeChatList from '../TypeChatList';

function TypeChatListPropTypes(props) {
  return TypeChatList(props);
}

TypeChatListPropTypes.propTypes = {
  typeChats: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default TypeChatListPropTypes;
