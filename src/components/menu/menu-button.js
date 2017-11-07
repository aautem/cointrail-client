import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

const styles = require('../../styles/app');

export default class MenuButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        large
        raised
        backgroundColor='lightgrey'
        buttonStyle={{ width: '100%' }}
        color='steelblue'
        icon={this.props.icon}
        title={this.props.title}
        loading={this.props.loading}
        onPress={this.props.onPress}
        borderRadius={5}
        containerViewStyle={{ borderRadius: 5 }}
      />
    );
  }
}

MenuButton.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};