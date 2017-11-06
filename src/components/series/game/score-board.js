import React from 'react';
import PropTypes from 'prop-types';
import TurnArrow from './turn-arrow';
import ScoreCard from './score-card';
import { Col, Row } from 'react-native-easy-grid';
const _appSS = require('../../../styles/app');

export default class ScoreBoard extends React.Component {
  render() {
    const players = this.props.game.players;
    const usernames = Object.keys(players);

    return (
      <Row size={1.75} style={{ backgroundColor: 'steelblue', paddingTop: 20 }}>
        <Col size={1.5} style={_appSS.center}>
          <TurnArrow
            player={players[usernames[0]]}
            turn={this.props.game.turn}
          />
        </Col>
        <Col size={3} style={_appSS.center}>
          <ScoreCard player={players[usernames[0]]} />
        </Col>
        <Col size={1.5} style={_appSS.center}>
          <TurnArrow
            player={players[usernames[1]]}
            turn={this.props.game.turn}
          />
        </Col>
        <Col size={3} style={_appSS.center}>
          <ScoreCard player={players[usernames[1]]} />
        </Col>
        <Col size={0.5}></Col>
      </Row>
    );
  }
}

ScoreBoard.propTypes = {
  game: PropTypes.object,
};