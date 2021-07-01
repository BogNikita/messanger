import PropTypes from 'prop-types';
import MessageList from '../MessageList';

function MessageListPropTypes(props) {
  return <MessageList {...props} />;
}

MessageListPropTypes.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      content: PropTypes.string,
      writtenBy: PropTypes.string.isRequired,
      imgSrc: PropTypes.string,
    }),
  ),
};

export default MessageListPropTypes;
