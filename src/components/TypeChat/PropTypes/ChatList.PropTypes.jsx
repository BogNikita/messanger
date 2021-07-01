import PropTypes from 'prop-types';
import ChatList from '../ChatList';

function ChatListPropTypes(props) {
  return ChatList(props);
}

ChatListPropTypes.propTypes = {
  title: PropTypes.string.isRequired,
  chats: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default ChatListPropTypes;
