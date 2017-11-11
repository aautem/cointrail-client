import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-native-easy-grid';
import GameColumn from './game-column';

const appSS = require('../../../styles/app');

export default class GameRow extends React.Component {
  render() {
    
    const columns = [];
    for (let count = 0; count < this.props.game.boardSize; count ++) {
      columns.push(
        <GameColumn
          key={`col-${count}`}
          rowId={this.props.rowId}
          colId={count}
          game={this.props.game}
        />
      );
    }

    return (
      <Row size={12/12}>
        { columns }
      </Row>
    );
  }
}

GameRow.propTypes = {
  rowId: PropTypes.number,
  game: PropTypes.object,
};