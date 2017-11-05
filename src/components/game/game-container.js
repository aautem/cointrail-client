import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as gameActions from '../../store/actions/game';
import Drawer from 'react-native-drawer';
import BottomDrawer from './bottom-drawer';
import Scoreboard from './scoreboard';
import Dropzone from './board/dropzone';
import BoardContainer from './board/board-container';

const styles = require('../../styles/app');

function mapStateToProps(state) {
  return {
    size: state.series.size,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initializeBoard: gameActions.initializeBoard,
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

  // resetGameboard() {
  //   const newGameboard = this.initializeBoard(this.state.size);
  //   this.setState((state) => {
  //     state.board = newGameboard;
  //     return state;
  //   });
  // }

  // resetBoardPoints() {
  //   const newBoardPoints = this.getBoardPoints(this.state.size);
  //   this.setState((state) => {
  //     state.boardPoints = newBoardPoints;
  //     return state;
  //   });
  // }

  // resetScoreboard() {
  //   this.setState((state) => {
  //     state.player1Score = 0;
  //     state.player2Score = 0;
  //     return state;
  //   });
  // }

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

GameContainer.propTypes = {
  initializeBoard: PropTypes.func,
  size: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);