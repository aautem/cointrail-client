import React from 'react';
import PropTypes from 'prop-types';
import GamePiece from './game-piece';
import { Col } from 'react-native-easy-grid';
const _appSS = require('../../../styles/app');

export default class GameColumn extends React.Component {
  render() {    
    const { game, rowId, colId } = this.props;
    const username = game.board[rowId][colId];
    const color = username ? game.players[username].gamePieceColor : 'lightgrey';

    return (
      <Col style={_appSS.center}>
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