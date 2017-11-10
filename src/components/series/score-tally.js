import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import WinIndicators from './win-indicators';
const appSS = require('../../styles/app');

export default class ScoreTally extends React.Component {
  render () {
    if (!this.props.player) {
      return null;
    }

    const pos = this.props.position;
    return (
      <Row size={7/7}>
        <Col size={5/10} style={{ justifyContent: pos === 'top' ? 'flex-end' : 'flex-start' }}>
          <Text style={{ color: '#aaa', fontWeight: 'bold', fontSize: 16, paddingLeft: 10, paddingBottom: pos === 'top' ? 20 : 0 }}>
            {this.props.player.username}
          </Text>
        </Col>

        {/* WIN INDICATORS // TODO: FIX PROPS */}
        {this.props.series &&
        <WinIndicators position={pos} player={this.props.player} series={null} />}

      </Row>
    );
  }
}

ScoreTally.propTypes = {
  player: PropTypes.object,
  series: PropTypes.object,
  position: PropTypes.oneOf(['top', 'bottom']),
};