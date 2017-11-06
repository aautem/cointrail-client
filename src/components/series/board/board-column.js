import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Coin from './coin';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View, Dimensions } from 'react-native';
import { Header, Button } from 'react-native-elements';

const styles = require('../../../styles/app');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    board: state.game.board,
    players: state.game.players,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class BoardColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    const { board, rowId, colId, players } = this.props;
    const playerId = board[rowId][colId] || null;
    let color = 'lightgrey';

    if (playerId) {
      color = players[playerId].color;
    }

    return (
      <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Coin playerId={playerId} color={color} rowId={rowId} colId={colId} />
      </Col>
    );
  }
}

BoardColumn.propTypes = {
  key: PropTypes.string,
  rowId: PropTypes.number,
  colId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardColumn);