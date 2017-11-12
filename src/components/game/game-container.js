import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Drawer from 'react-native-drawer';
import BottomDrawer from './drawer/bottom-drawer';
import ScoreBoard from './board/score-board';
import DropZone from './board/drop-zone';
import GameBoard from './board/game-board';
import SeriesResultsModal from '../series/modals/series-results';
import GameResultsModal from '../series/modals/game-results';
import * as appActions from '../../store/actions/app';
import * as seriesActions from '../../store/actions/series';
import * as gameActions from '../../store/actions/game';

const appSS = require('../../styles/app');

function mapStateToProps(state) {
  return {
    game: state.game,
    user: state.user,
    resultsModal: state.game.showResultsModal,
    loading: state.game.loading,
    loaded: state.game.loaded,
    error: state.game.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showResultsModal: gameActions.showResultsModal,
    endGame: gameActions.endGame,
    continueSeries: seriesActions.continueSeries,
    changePage: appActions.changePage,
  }, dispatch);
};

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerClosed: true,
    };
  }

  componentDidMount() {
    this.closeDrawer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.game.gameOver && !nextProps.game.showResultsModal) {
      if (nextProps.game.winByPoints || nextProps.game.draw) {
        setTimeout(this.props.showResultsModal, 2500);
      } else if (nextProps.game.winByConnect) {
        console.log('*** WIN BY CONNECTION, SETTING TIMEOUT ***');

        // trigger animation to highlight winning pieces
        // setTimeout(this.props.showWinningConnection, 2000);
        setTimeout(this.props.showResultsModal, 3000);
      }
    }
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    this._drawer.close();
  }

  quitGame() {
    // confirm forfeit
    // reset series and game in state
    this.props.changePage('menu');
  }

  render () {
    if (!this.props.game.roomName) {
      return null;
    }

    // SERIES RESETS AFTER FIRST MOVE OF SECOND GAME???
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref }}
        side='bottom'
        type='overlay'
        initializeOpen={true}
        closedDrawerOffset={3.5/14}
        openDrawerOffset={(viewport) => (viewport.height / 10 )}
        onOpen={() => { this.setState({ drawerClosed: false }) }}
        onClose={() => { this.setState({ drawerClosed: true }) }}
        panThreshold={1/12}
        content={
          <BottomDrawer
            gameMode={this.props.game.mode}
            drawerClosed={this.state.drawerClosed}
            openDrawer={this.openDrawer.bind(this)}
            closeDrawer={this.closeDrawer.bind(this)}
            quitGame={this.quitGame.bind(this)}
          />
        }
      >
        <Col size={14/14}>
          
          {/* SCOREBOARD */}
          <ScoreBoard game={this.props.game} />

          {/* GAMEBOARD */}
          <Row size={14/16}>
            <Col size={14/14} style={{ backgroundColor: '#fff' }}>
             
              {/* DROP BUTTONS */}
              <DropZone game={this.props.game} />

              {/* GAME BOARD */}
              <GameBoard game={this.props.game} />
            
            </Col>
          </Row>

          {/* MODAL OVERLAYS */}
          <GameResultsModal
            game={this.props.game}
            loading={this.props.loading}
            showModal={this.props.resultsModal}
            handleButtonPress={this.props.game.mode === 'solo' ? this.props.endGame : this.props.continueSeries}
          />

          <SeriesResultsModal />
        </Col>
      </Drawer>
    );
  }
}

GameContainer.propTypes = {
  showResultsModal: PropTypes.func,
  resultsModal: PropTypes.bool,
  series: PropTypes.object,
  game: PropTypes.object,
  username: PropTypes.string,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);