import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import Drawer from 'react-native-drawer';
import { Row } from 'react-native-easy-grid';
import BottomDrawer from './bottom-drawer';
import ScoreBoard from './game/score-board';
import DropZone from './game/drop-zone';
import GameContainer from './game/game-container';
import GameResultsModal from './modals/game-results';
const _appSS = require('../../styles/app');

function mapStateToProps(state) {
  return {
    // seriesPlayers: state.series.players,
    // mySeriesPlayer: state.series.players ? state.series.players[state.user.username],
    // roomName: state.series.roomName,
    // seriesLength: state.series.seriesLength,
    // boardSize: state.series.boardSize,
    // timeLimit: state.series.timeLimit,
    // gamesPlayed: state.series.gamesPlayed,
    // games: state.series.games,
    // winner: state.series.winner,
    // draw: state.series.draw,
    // seriesOver: state.series.seriesOver,
    // winByPoints: state.series.winByPoints,
    username: state.user.username,
    loading: state.series.loading,
    loaded: state.series.loaded,
    error: state.series.error,
    currentGame: state.series.games[state.series.games.length - 1],
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class SeriesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  openDrawer() {
    this._drawer.open();
  };

  closeDrawer() {
    this._drawer.close();
  };

  render () {
    if (this.props.loading) {
      return (
        <Row style={[_appSS.center, { backgroundColor: '#fff' }]}>
          <ActivityIndicator animating={true} color='steelblue' size='large' />
        </Row>
      );
    }

    const showGameResults = this.props.currentGame.gameOver;

    return (
      <Drawer
        ref={(ref) => { this._drawer = ref }}
        side='bottom'
        type='overlay'
        content={<BottomDrawer />}
        openDrawerOffset={115}
        closedDrawerOffset={100}
        tapToClose={true}
      >
        <ScoreBoard game={this.props.currentGame} />
        <DropZone game={this.props.currentGame} username={this.props.username} />
        <GameContainer game={this.props.currentGame} />
        <GameResultsModal showModal={showGameResults} game={this.props.currentGame} />
      </Drawer>
    );
  }
}

SeriesContainer.propTypes = {
  currentGame: PropTypes.object,
  username: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesContainer);