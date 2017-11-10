import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import Indicator from './indicator';
const appSS = require('../../styles/app');

export default class WinIndicators extends React.Component {
  render () {
    if (!this.props.player.username) {
      return null;
    }
    
    const indicators = [];
    for (let count = 0; count < 4; count ++) {
      let color = '#fff';
      // if (this.props.series.games[count] && this.props.series.games[count].winner) {
      //   if (this.props.series.games[count].winner === this.props.player.username) {
      //     color = this.props.player.color;
      //   } else {
      //     color = '#bbb';
      //   }
      // } else if (this.props.series.games[count] && this.props.series.games[count].draw) {
      //   color = '#bbb';
      // }
      indicators.push(
        <Indicator
          color={color}
          key={`${this.props.player.username}-indicator-${count}`}
        />
      );
    }
    // for (let count = 0; count < this.props.series.seriesLength; count ++) {
    //   let color = '#fff';
    //   if (this.props.series.games[count] && this.props.series.games[count].winner) {
    //     if (this.props.series.games[count].winner === this.props.player.username) {
    //       color = this.props.player.gamePieceColor;
    //     } else {
    //       color = '#bbb';
    //     }
    //   } else if (this.props.series.games[count] && this.props.series.games[count].draw) {
    //     color = '#bbb';
    //   }
    //   indicators.push(
    //     <Indicator
    //       color={color}
    //       key={`${this.props.player.username}-indicator-${count}`}
    //     />
    //   );
    // }

    return (
      <Col size={5/10}>
        <Row style={{
          alignItems: this.props.position === 'top' ? 'flex-end' : 'flex-start',
          paddingBottom: this.props.position === 'top' ? 20 : 0,
        }}>
          { indicators }
        </Row>
      </Col>
    );
  }
}

WinIndicators.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom']),
  // series: PropTypes.object,
  player: PropTypes.object,
};