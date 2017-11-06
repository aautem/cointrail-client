import React from 'react';
import PropTypes from 'prop-types';
import GameRow from './game-row';
import { Col, Row } from 'react-native-easy-grid';
const _appSS = require('../../../styles/app');

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // check for game over, etc.
  }

  render() {
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
      <Row size={6} style={{ paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
        <Col>
          { rows }
        </Col>
      </Row>
    );
  }
}

GameContainer.propTypes = {
  game: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);