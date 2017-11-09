import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as seriesActions from '../../store/actions/series';
import { ActivityIndicator } from 'react-native';
import Drawer from 'react-native-drawer';
import { Grid, Col, Row } from 'react-native-easy-grid';
import BottomDrawer from './bottom-drawer';
import ScoreBoard from './game/score-board';
import DropZone from './game/drop-zone';
import GameContainer from './game/game-container';
import GameResultsModal from './modals/game-results';
const appSS = require('../../styles/app');

function mapStateToProps(state) {
  return {
    series: state.series,
    username: state.user.username,
    game: state.game,
    loading: state.series.loading,
    loaded: state.series.loaded,
    error: state.series.error,
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

  componentDidMount() {
    // this.closeDrawer();
  }

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

    // ISSUE WITH DRAWER NOT BEING IN THE RIGHT POSITION ON LOAD
    // SERIES RESETS AFTER FIRST MOVE OF SECOND GAME???

    return (
      <Drawer
        ref={(ref) => { this._drawer = ref }}
        side='bottom'
        type='overlay'
        content={<BottomDrawer
          series={this.props.series}
          openDrawer={this.openDrawer.bind(this)}
          closeDrawer={this.closeDrawer.bind(this)}
        />}
        openDrawerOffset={155}
        closedDrawerOffset={140}
        tapToClose={true}
        open={false}
      >
        <Col size={14/14}>
          
          {/* SCOREBOARD */}
          <ScoreBoard game={this.props.game} />

          {/* GAMEBOARD */}
          <Row size={14/16}>
            <Col size={14/14} style={{ backgroundColor: '#eee' }}>
             
              {/* DROP BUTTONS */}
              <DropZone game={this.props.game} username={this.props.username} />

              {/* GAME BOARD */}
              <GameContainer game={this.props.game} />
            
            </Col>
          </Row>

          {/* MODAL OVERLAYS */}
          <GameResultsModal
            showModal={this.props.game ? this.props.game.gameOver : false}
            game={this.props.game}
            loading={this.props.loading}
            startNextGame={this.startNextGame.bind(this)}
          />
          {/* <SeriesResultsModal /> */}
        </Col>
      </Drawer>
    );
  }
}

SeriesContainer.propTypes = {
  series: PropTypes.object,
  game: PropTypes.object,
  username: PropTypes.string,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesContainer);