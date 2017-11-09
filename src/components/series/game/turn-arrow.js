import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { Grid, Col, Row } from 'react-native-easy-grid';
const appSS = require('../../../styles/app');

export default class TurnArrow extends React.Component {
  render() {
    const { player, turn } = this.props;
    const icon = player && player.username === turn ? 'ios-play' : 'ios-play-outline';
    return (
      <Col size={2/7} style={appSS.center}>
        <Icon
          size={30}
          name={icon}
          type='ionicon'
          color='#fff'
        />
      </Col>
    );
  }
}

TurnArrow.propTypes = {
  player: PropTypes.object,
  turn: PropTypes.string,
};