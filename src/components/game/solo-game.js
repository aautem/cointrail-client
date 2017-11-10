import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Drawer from 'react-native-drawer';
import BottomDrawer from '../series/bottom-drawer';
import ScoreBoard from '../series/game/score-board';
import DropZone from '../series/game/drop-zone';
import GameContainer from '../series/game/game-container';
import GameResultsModal from '../series/modals/game-results';
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
    resetGame: gameActions.resetGame,
  }, dispatch);
};

class SoloGameContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.resultsModal && nextProps.game.gameOver) {
      if (nextProps.game.winByPoints || nextProps.game.draw) {
        setTimeout(this.props.showResultsModal, 3000);
      } else if (nextProps.game.winByConnection) {
        // trigger animation to highlight winning pieces
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

  render () {
    if (!this.props.game) {
      return null;
    }

    // ISSUE WITH DRAWER NOT BEING IN THE RIGHT POSITION ON LOAD
    // SERIES RESETS AFTER FIRST MOVE OF SECOND GAME???

    return (
      <Drawer
        ref={(ref) => { this._drawer = ref }}
        side='bottom'
        type='overlay'
        content={<BottomDrawer
          series={this.props.series}
          game={this.props.game}
          openDrawer={this.openDrawer.bind(this)}
          closeDrawer={this.closeDrawer.bind(this)}
        />}
        openDrawerOffset={155}
        closedDrawerOffset={140}
        open={false}
      >
        <Col size={14/14}>
          
          {/* SCOREBOARD */}
          <ScoreBoard game={this.props.game} />

          {/* GAMEBOARD */}
          <Row size={14/16}>
            <Col size={14/14} style={{ backgroundColor: '#fff' }}>
             
              {/* DROP BUTTONS */}
              <DropZone game={this.props.game} username={this.props.user.username} />

              {/* GAME BOARD */}
              <GameContainer game={this.props.game} />
            
            </Col>
          </Row>

          {/* MODAL OVERLAYS */}
          <GameResultsModal
            showModal={this.props.resultsModal}
            handleButtonPress={this.props.resetGame}
            game={this.props.game}
            loading={this.props.loading}
            startNextGame={() => { }}
          />
          {/* <SeriesResultsModal /> */}
        </Col>
      </Drawer>
    );
  }
}

SoloGameContainer.propTypes = {
  showResultsModal: PropTypes.func,
  resultsModal: PropTypes.bool,
  series: PropTypes.object,
  game: PropTypes.object,
  username: PropTypes.string,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoloGameContainer);