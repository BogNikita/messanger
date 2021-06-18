import PropTypes from 'prop-types';
import ChatListItem from '../ChatListItem';

function ChatListItemPropTypes(props) {
  return ChatListItem(props);
}

ChatListItemPropTypes.propTypes = {
  title: PropTypes.string,
  chat: PropTypes.shape({
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        timestamp: PropTypes.number.isRequired,
        writtenBy: PropTypes.string.isRequired,
      }),
    ),
    isTyping: PropTypes.bool,
  }),
  clickHandler: PropTypes.func.isRequired,
};

export default ChatListItemPropTypes;
