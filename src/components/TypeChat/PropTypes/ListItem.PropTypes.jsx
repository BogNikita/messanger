import PropTypes from 'prop-types';
import ListItem from '../ListItem';

function ListItemPropTypes(props) {
  return <ListItem {...props}/>;
}

ListItemPropTypes.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ListItemPropTypes;
