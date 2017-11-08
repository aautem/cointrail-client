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

    console.log('\x1b[34m', 'Series container rendering', this.props.game);

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
        <ScoreBoard game={this.props.game} />
        <DropZone game={this.props.game} username={this.props.username} />
        <GameContainer game={this.props.game} />
        <GameResultsModal
          showModal={this.props.game ? this.props.game.gameOver : false}
          game={this.props.game}
          loading={this.props.loading}
          startNextGame={this.startNextGame.bind(this)}
        />
        {/* <SeriesResultsModal /> */}
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