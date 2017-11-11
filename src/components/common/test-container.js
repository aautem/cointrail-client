import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import * as seriesActions from '../../store/actions/series';
import { ActivityIndicator } from 'react-native';
import Drawer from 'react-native-drawer';
import { Grid, Col, Row } from 'react-native-easy-grid';
import BottomDrawer from '../game/drawer/bottom-drawer';
import ScoreBoard from '../series/game/score-board';
import DropZone from '../series/game/drop-zone';
import GameBoard from '../series/game/game-board';
import GameResultsModal from '../series/modals/game-results';
const appSS = require('../../styles/app');

const loading = false;

const series = {
  seriesLength: 4,
  boardSize: 4,
  timeLimit: false,
  gamesPlayed: 0,
  games: [],
  winner: null,
  draw: false,
  seriesOver: false,
  winByPoints: false,
  players: {},
  roomName: 'test-room',
};

const username = 'aautem';

const game = {
  roomName: 'test-room',
  boardSize: 4,
  timeLimit: false,
  winner: 'aautem',
  draw: false,
  gameOver: false,
  winByPoints: false,
  board: [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  boardPoints: [
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15]
  ],
  players: {},
  turn: 'aautem'
};

series.games.push(game);

const p1Color = '#3780B6';
const p2Color = '#71CFEE';

series.players[username] = {
  id: '1',
  username: username,
  avatarUrl: 'https://s.gravatar.com/avatar/ed70ccead677f6d59ba3edac7d3acb64?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fau.png',
  gamePieceColor: '#3780B6',
  points: 0,
  winner: false,
  wins: 0,
  losses: 0,
  draws: 0,
};

series.players['au'] = {
  id: '1',
  username: 'au',
  avatarUrl: 'https://i1.wp.com/cdn.auth0.com/avatars/au.png?ssl=1',
  gamePieceColor: '#71CFEE',
  points: 0,
  winner: false,
  wins: 0,
  losses: 0,
  draws: 0,
};

game.players[username] = {
  id: '1',
  username: username,
  avatarUrl: 'https://s.gravatar.com/avatar/ed70ccead677f6d59ba3edac7d3acb64?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fau.png',
  gamePieceColor: '#3780B6',
  points: 0,
  winner: false,
};

game.players['au'] = {
  id: '1',
  username: 'au',
  avatarUrl: 'https://i1.wp.com/cdn.auth0.com/avatars/au.png?ssl=1',
  gamePieceColor: '#71CFEE',
  points: 0,
  winner: false,
};

function mapStateToProps(state) {
  return {
    // series: state.series,
    // username: state.user.username,
    // game: state.game,
    // loading: state.series.loading,
    // loaded: state.series.loaded,
    // error: state.series.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // startNextGame: seriesActions.startNextGame,
  }, dispatch);
};

class SeriesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.closeDrawer();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    this._drawer.close();
  }

  startNextGame() {
    // this.props.startNextGame(this.props.series);
  }

  render () {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref }}
        side='bottom'
        type='overlay'
        content={<BottomDrawer
          series={series}
          openDrawer={this.openDrawer.bind(this)}
          closeDrawer={this.closeDrawer.bind(this)}
        />}
        openDrawerOffset={155}
        closedDrawerOffset={140}
        tapToClose={true}
        open={true}
      >
        <Col size={14/14}>
          
          {/* SCOREBOARD */}
          <ScoreBoard game={game} />

          {/* GAMEBOARD */}
          <Row size={14/16}>
            <Col size={14/14} style={{ backgroundColor: '#eee' }}>
             
              {/* DROP BUTTONS */}
              <DropZone game={game} username={username} />

              {/* GAME BOARD */}
              <GameBoard game={game} />
            
            </Col>
          </Row>

          {/* MODAL OVERLAYS */}
          <GameResultsModal
            showModal={game ? game.gameOver : false}
            game={game}
            loading={loading}
            startNextGame={this.startNextGame.bind(this)}
          />
          {/* <SeriesResultsModal /> */}
        </Col>
      </Drawer>
    );
  }
}

SeriesContainer.propTypes = {
  // series: PropTypes.object,
  // game: PropTypes.object,
  // username: PropTypes.string,
  // loading: PropTypes.bool,
  // loaded: PropTypes.bool,
  // error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesContainer);