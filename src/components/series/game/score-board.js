import React from 'react';
import PropTypes from 'prop-types';
import TurnArrow from './turn-arrow';
import ScoreCard from './score-card';
import { Grid, Col, Row } from 'react-native-easy-grid';
const _appSS = require('../../../styles/app');

export default class ScoreBoard extends React.Component {
  render() {
    if (!this.props.game) {
      return null;
    }

    const players = this.props.game.players;
    const usernames = Object.keys(players);

    return (
      <Row size={2/16}>
        <Col size={7/14} style={[{ backgroundColor: players[usernames[0]] ? players[usernames[0]].gamePieceColor : '#aaa' }]}>
          <Row>
            <TurnArrow
              player={players[usernames[0]]}
              turn={this.props.game.turn}
            />
            <ScoreCard player={players[usernames[0]]} />
          </Row>
        </Col>
        <Col size={7/14} style={[{ backgroundColor: players[usernames[1]] ? players[usernames[1]].gamePieceColor : '#aaa' }]}>
          <Row>
            <TurnArrow
              player={players[usernames[1]]}
              turn={this.props.game.turn}
            />
            <ScoreCard player={players[usernames[1]]} />
          </Row>
        </Col>
      </Row>
    );
  }
}

ScoreBoard.propTypes = {
  game: PropTypes.object,
};