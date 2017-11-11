import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-native-easy-grid';
import GameRow from './game-row';

const appSS = require('../../../styles/app');

class GameBoard extends React.Component {
  render() {
    if (!this.props.game.roomName) {
      return null;
    }

    const rows = [];
    for (let count = 0; count < this.props.game.boardSize; count ++) {
      rows.push(
        <GameRow
          key={`row-${count}`}
          rowId={count}
          game={this.props.game}
        />
      );
    }

    return (
      <Row size={12/14}>
        <Col style={{ paddingBottom: 20 }}>
          { rows }
        </Col>
      </Row>
    );
  }
}

GameBoard.propTypes = {
  game: PropTypes.object,
};