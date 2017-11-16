import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { ActivityIndicator } from 'react-native';
import Drawer from 'react-native-drawer';
import BottomDrawer from './drawer/bottom-drawer';
import ScoreBoard from './board/score-board';
import DropZone from './board/drop-zone';
import GameBoard from './board/game-board';
import GameResultsModal from './game-results-modal';
import * as appActions from '../../store/actions/app';
import * as gameActions from '../../store/actions/game';
import { APP_PAGES } from '../../utilities/const';

const appSS = require('../../styles/app');

function mapStateToProps(state) {
  return {
    game: state.game,
    user: state.user,
    loading: state.game.loading,
    loaded: state.game.loaded,
    error: state.game.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
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
    // trigger animation to highlight winning pieces
    // setTimeout(this.props.showWinningConnection, 2000);
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    this._drawer.close();
  }

  quitGame() {
    // confirm forfeit
    // reset game in state
    this.props.changePage(APP_PAGES.MENU);
  }

  render () {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref }}
        side='bottom'
        type='overlay'
        initializeOpen={false}
        closedDrawerOffset={3.5/14}
        openDrawerOffset={(viewport) => (viewport.height / 10 )}
        onOpen={() => { this.setState({ drawerClosed: false }) }}
        onClose={() => { this.setState({ drawerClosed: true }) }}
        panThreshold={1/12}
        content={
          <BottomDrawer
            gameMode={this.props.game.mode}
            timeLimit={this.props.game.timeLimit}
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
          <GameResultsModal />
          
        </Col>
      </Drawer>
    );
  }
}

GameContainer.propTypes = {
  changePage: PropTypes.func,
  game: PropTypes.object,
  username: PropTypes.string,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);