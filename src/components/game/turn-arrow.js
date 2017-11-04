import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';

const styles = require('../../styles/app');

function mapStateToProps(state) {
  return {
    turn: state.game.turn,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class TurnArrow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.playerId === this.props.turn ? 'ios-play' : 'ios-play-outline';

    return (
      <Icon
        size={30}
        name={name}
        type='ionicon'
        color='#fff'
      />
    );
  }
}

TurnArrow.propTypes = {
  turn: PropTypes.string,
  playerId: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnArrow);