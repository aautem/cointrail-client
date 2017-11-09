import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import Indicator from './indicator';
const appSS = require('../../styles/app');

export default class WinIndicators extends React.Component {
  render () {
    const indicators = [];
    for (let count = 0; count < this.props.series.seriesLength; count ++) {
      let color = '#fff';
      if (this.props.series.games[count] && this.props.series.games[count].winner) {
        if (this.props.series.games[count].winner === this.props.player.username) {
          color = this.props.player.gamePieceColor;
        } else {
          color = '#bbb';
        }
      } else if (this.props.series.games[count] && this.props.series.games[count].draw) {
        color = '#bbb';
      }
      indicators.push(
        <Indicator
          color={color}
          key={`${this.props.player.username}-indicator-${count}`}
        />
      );
    }

    return (
      <Col size={6/10}>
        <Row style={appSS.center}>
          { indicators }
        </Row>
      </Col>
    );
  }
}

WinIndicators.propTypes = {
  series: PropTypes.object,
  player: PropTypes.object,
};