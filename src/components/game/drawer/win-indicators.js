import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';

const appSS = require('../../../styles/app');

export default class WinIndicators extends React.Component {
  render () {
    if (!this.props.series.roomName) {
      return null;
    }
    
    const indicators = [];
    for (let count = 0; count < this.props.series.seriesLength; count ++) {
      let color = '#fff';
      if (this.props.series.games[count] && this.props.series.games[count].winner) {
        if (this.props.series.games[count].winner === this.props.player.username) {
          color = this.props.player.color;
        } else {
          color = '#ccc';
        }
      } else if (this.props.series.games[count] && this.props.series.games[count].draw) {
        color = '#ccc';
      }
      indicators.push(
        <View
          key={`${this.props.player.username}-${color}-${count}`}
          style={{
            height: 15,
            width: 15,
            borderRadius: 100,
            backgroundColor: color,
            marginLeft: 5,
            marginRight: 5,
            borderColor: '#aaa',
            borderWidth: 0.5
          }}
        />
      );
    }

    return (
      <Row size={3.5/7} style={{
        alignItems: this.props.position === 'top' ? 'flex-end' : 'flex-start',
        paddingBottom: 20 }}>
        { indicators }
      </Row>
    );
  }
}

WinIndicators.propTypes = {
  player: PropTypes.object,
  series: PropTypes.object,
  position: PropTypes.string,
};