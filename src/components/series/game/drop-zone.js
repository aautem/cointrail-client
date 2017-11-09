import React from 'react';
import PropTypes from 'prop-types';
import DropButton from './drop-button';
import { Row } from 'react-native-easy-grid';

export default class DropZone extends React.Component {
  render() {    
    const dropButtons = [];
    for (let count = 0; count < this.props.game.boardSize; count ++) {
      dropButtons.push(
        <DropButton
          key={`drop-btn-${count}`}
          colId={count}
          game={this.props.game}
          username={this.props.username}
        />
      );
    }

    return (
      <Row size={2/14} style={{ paddingTop: 5 }}>
        { dropButtons }
      </Row>
    );
  }
}

DropZone.propTypes = {
  game: PropTypes.object,
  username: PropTypes.string,
};