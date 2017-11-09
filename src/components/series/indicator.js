import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
const appSS = require('../../styles/app');

export default class Indicator extends React.Component {
  render () {
    return (
      <View style={{
        height: 15,
        width: 15,
        borderRadius: 100,
        backgroundColor: this.props.color,
        marginLeft: 5,
        marginRight: 5,
        borderColor: '#fff',
        borderWidth: 0.5
      }} />
    );
  }
}

Indicator.propTypes = {
  color: PropTypes.string,
};