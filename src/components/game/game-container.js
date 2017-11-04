import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scoreboard from './scoreboard';
import Dropzone from './board/dropzone';
import BoardContainer from './board/board-container';
import BottomDrawer from './bottom-drawer';
import Drawer from 'react-native-drawer';
import * as game from '../../store/actions/game';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

const styles = require('../../styles/containers');

function mapStateToProps(state) {
  return {
    series: state.series,
    size: state.series.settings.size,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initializeBoard: game.initializeBoard,
  }, dispatch);
};

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.initializeBoard(this.props.size);
    // set up series and game states
  }

  componentWillUnmount() {}

  // TODO: combine build and get board points into single init function
  initializeBoard(size) {
    let gameboard = [];
    for (let row = 0; row < size; row ++) {
      gameboard[row] = [];
      for (col = 0; col < size; col ++) {
        gameboard[row][col] = 0;
      }
    }
    return gameboard;
  }

  // TODO: make work for any board size
  getBoardPoints(size) {
    let pointValues = POINT_VALUES.slice();
    let valuesLeft = VALUES_LEFT[size].slice();
    let boardPoints = [];
    for (let row = 0; row < size; row ++) {
      boardPoints[row] = [];
      for (let col = 0; col < size; col ++) {
        const index = Math.floor(Math.random() * pointValues.length);
        boardPoints[row].push(pointValues[index]);
        valuesLeft[index] --;
        if (!valuesLeft[index]) {
          pointValues = pointValues.slice(0, index).concat(pointValues.slice(index + 1));
          valuesLeft = valuesLeft.slice(0, index).concat(valuesLeft.slice(index + 1));
        }
      }
    }
    return boardPoints;
  }

  resetGameboard() {
    const newGameboard = this.initializeBoard(this.state.size);
    this.setState((state) => {
      state.board = newGameboard;
      return state;
    });
  }

  resetBoardPoints() {
    const newBoardPoints = this.getBoardPoints(this.state.size);
    this.setState((state) => {
      state.boardPoints = newBoardPoints;
      return state;
    });
  }

  resetScoreboard() {
    this.setState((state) => {
      state.player1Score = 0;
      state.player2Score = 0;
      return state;
    });
  }

  openDrawer() {
    this._drawer.open();
  };

  closeDrawer() {
    this._drawer.close();
  };

  render () {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref }}
        type='overlay'
        content={<BottomDrawer />}
        side='bottom'
        openDrawerOffset={115}
        closedDrawerOffset={100}
        tapToClose={true}
      >
        <Scoreboard />
        <Dropzone />
        <BoardContainer />
      </Drawer>
    );
  }
}

// GameContainer.propTypes = {
//   //
// };

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);