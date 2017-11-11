import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-native-easy-grid';
import DropButton from './drop-button';

export default class DropZone extends React.Component {
  render() {
    if (!this.props.username) {
      return null;
    }
    
    const dropButtons = [];
    for (let count = 0; count < this.props.game.boardSize; count ++) {
      dropButtons.push(
        <DropButton
          key={`drop-btn-${count}`}
          colId={count}
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
  //
};