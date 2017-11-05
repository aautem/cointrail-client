import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View, Dimensions } from 'react-native';
import { Header, Button } from 'react-native-elements';

const styles = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const animateDrop = {
  from: {
    translateY: -500,
    opacity: 0.25,
  },
  to: {
    translateY: 0,
    opacity: 1,
  }
};

function mapStateToProps(state, ownProps) {
  return {
    size: state.series.size,
    points: state.game.boardPoints[ownProps.rowId][ownProps.colId],
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class Coin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {
    if (!this.props.playerId && nextProps.playerId) {
      const ref = `coin-${nextProps.rowId}-${nextProps.colId}`;
      this.refs[ref].transition(animateDrop.from, animateDrop.to, 800, 'ease-out-expo');
    }
  }

  render() {
    const { playerId, color, rowId, colId, size } = this.props;
    const hw = (viewportWidth / size) - 25;

    return (
      <Animatable.View
        ref={`coin-${rowId}-${colId}`}
        style={{
          backgroundColor: color,
          borderRadius: 100,
          height: hw,
          width: hw,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!playerId && <Text style={{ color: 'steelblue' }}>{this.props.points}</Text>}
      </Animatable.View>
    );
  }
}

Coin.propTypes = {
  playerId: PropTypes.string,
  color: PropTypes.string,
  rowId: PropTypes.number,
  colId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coin);