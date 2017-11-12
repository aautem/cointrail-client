import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as seriesActions from '../../store/actions/series';
import { Grid, Col, Row } from 'react-native-easy-grid';
import GameContainer from '../game/game-container';
import SeriesResultsModal from './modals/series-results';

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
    showResultsModal: seriesActions.showResultsModal,
  }, dispatch);
};

class SeriesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    //
  }

  render () {
    if (!this.props.series.roomName) {
      return null;
    }

    return (
      <Col size={14/14}>
        <Row size={24/24}>
        
          <GameContainer />

          <SeriesResultsModal />

        </Row>
      </Col>
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