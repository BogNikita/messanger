import PropTypes from 'prop-types';
import MessageFieldForm from '../MessageFieldForm';

function MessageFieldFormPropTypes(props) {
  return <MessageFieldForm {...props} />;
}

MessageFieldFormPropTypes.propTypes = {
  status: PropTypes.string,
  isContinue: PropTypes.bool,
  email: PropTypes.string,
  clickHandler: PropTypes.func,
  autoComplete: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  channels: PropTypes.number,
  isTyping: PropTypes.bool,
  sendMessage: PropTypes.func.isRequired,
};

export default MessageFieldFormPropTypes;
