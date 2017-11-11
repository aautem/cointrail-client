import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as seriesActions from '../../store/actions/series';
import { ActivityIndicator } from 'react-native';
import Drawer from 'react-native-drawer';
import { Grid, Col, Row } from 'react-native-easy-grid';

import GameContainer from '../game/game-container';
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

  componentWillReceiveProps(nextProps) {
    // if series over
      // show series results modal
  }

  // startNextGame() {
  //   this.props.startNextGame(this.props.series);
  // }

  render () {
    if (!this.props.series.roomName) {
      return null;
    }

    return (
      <GameContainer />
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