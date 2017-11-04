import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scoreboard from './scoreboard';
import Dropzone from './board/dropzone';
import BoardContainer from './board/board-container';
import BottomDrawer from './bottom-drawer';
import Drawer from 'react-native-drawer';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

const styles = require('../../styles/containers');

const POINT_VALUES = [5, 10, 25, 50, 100, 150];

const VALUES_LEFT = {
  4: [4, 4, 4, 2, 1, 1], // 16 spaces
  5: [6, 6, 6, 4, 2, 1], // 25 spaces
  6: [10, 8, 8, 6, 2, 2], // 36 spaces
};

function mapStateToProps(state) {
  return {
    series: state.series,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

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
        openDrawerOffset={100}
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