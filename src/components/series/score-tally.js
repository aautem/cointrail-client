import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import WinIndicators from './win-indicators';
const appSS = require('../../styles/app');

export default class ScoreTally extends React.Component {
  render () {
    return (
      <Row size={2.5/5}>
        <Col size={4/10} style={appSS.center}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            {this.props.player ? this.props.player.username.toUpperCase() : ''}
          </Text>
        </Col>

        {/* WIN INDICATORS */}
        <WinIndicators player={this.props.player} series={this.props.series} />

      </Row>
    );
  }
}

ScoreTally.propTypes = {
  player: PropTypes.object,
  series: PropTypes.object,
};