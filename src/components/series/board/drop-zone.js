import React from 'react';
import PropTypes from 'prop-types';
import DropButton from './drop-button';
import { Row } from 'react-native-easy-grid';

class DropZone extends React.Component {
  render() {
    const dropButtons = [];
    for (let count = 0; count < this.props.game.boardSize; count ++) {
      dropButtons.push(
        <DropButton
          key={`drop-btn-${count + 1}`}
          colId={count}
          game={this.props.game}
        />
      );
    }

    return (
      <Row size={1.25} style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, backgroundColor: '#fff' }}>
        { dropButtons }
      </Row>
    );
  }
}

DropZone.propTypes = {
  game: PropTypes.object,
};