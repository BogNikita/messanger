import PropTypes from 'prop-types';
import MessageField from '../MessageField';

function MessageFieldPropTypes(props) {
  return MessageField(props);
}

MessageFieldPropTypes.propTypes = {
  status: PropTypes.string,
  chatId: PropTypes.string,
};

export default MessageFieldPropTypes;
