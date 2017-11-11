import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-native-easy-grid';
import GamePiece from './game-piece';

const appSS = require('../../../styles/app');

export default class GameColumn extends React.Component {
  render() {
    if (!this.props.game.roomName) {
      return null;
    }

    // NEED METHOD FOR ANIMATING WINNING LINES

    const { game, rowId, colId } = this.props;
    const username = game.board[rowId][colId];
    let color = '#eee';
    if (username) {
      color = game.players[username].color;
    }

    return (
      <Col style={appSS.center}>
        <GamePiece
          username={username}
          color={color}
          rowId={rowId}
          colId={colId}
          boardSize={game.boardSize}
          points={game.boardPoints[rowId][colId]}
        />
      </Col>
    );
  }
}

GameColumn.propTypes = {
  rowId: PropTypes.number,
  colId: PropTypes.number,
  game: PropTypes.object,
};