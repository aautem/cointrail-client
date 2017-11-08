import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as seriesActions from '../../store/actions/series';
import { ActivityIndicator } from 'react-native';
import Drawer from 'react-native-drawer';
import { Row } from 'react-native-easy-grid';
import BottomDrawer from './bottom-drawer';
import ScoreBoard from './game/score-board';
import DropZone from './game/drop-zone';
import GameContainer from './game/game-container';
import GameResultsModal from './modals/game-results';
const appSS = require('../../styles/app');

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
    series: state.series,
    username: state.user.username,
    loading: state.series.loading,
    loaded: state.series.loaded,
    error: state.series.error,
    currentGame: state.series.games[state.series.games.length - 1],
    gameIndex: state.series.games.length - 1,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startNextGame: seriesActions.startNextGame,
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
  }

  closeDrawer() {
    this._drawer.close();
  }

  startNextGame() {
    this.props.startNextGame(this.props.series);
  }

  render () {
    if (this.props.loading) {
      return (
        <Row style={[appSS.center, { backgroundColor: '#fff' }]}>
          <ActivityIndicator animating={true} color='steelblue' size='large' />
        </Row>
      );
    }

    const showGameResults = this.props.currentGame.gameOver;

    console.log('\x1b[34m', 'Series container rendering', this.props.series.games);

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
        <GameResultsModal
          showModal={showGameResults}
          game={this.props.currentGame}
          loading={this.props.loading}
          startNextGame={this.startNextGame.bind(this)}
        />
        {/* <SeriesResultsModal /> */}
      </Drawer>
    );
  }
}

SeriesContainer.propTypes = {
  currentGame: PropTypes.object,
  gameIndex: PropTypes.number,
  username: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesContainer);