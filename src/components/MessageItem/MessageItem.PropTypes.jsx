import React from 'react';
import PropTypes from 'prop-types';
import MessageItem from './MessageItem';

function MessageItemPropTypes(props) {
  return MessageItem(props);
}

MessageItemPropTypes.propTypes = {
  timestamp: PropTypes.number.isRequired,
  content: PropTypes.string,
  user: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
};

export default React.memo(MessageItemPropTypes);
