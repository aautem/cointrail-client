import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

export default class HeaderIcon extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        type={this.props.type}
        color={this.props.color}
        onPress={this.props.onPress}
      />
    );
  }
}

HeaderIcon.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
};