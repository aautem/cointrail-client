import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TurnArrow from './turn-arrow';
import ScoreCard from './score-card';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';

const styles = require('../../styles/app');

function mapStateToProps(state) {
  return {
    players: state.game.players,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    const playerIds = Object.keys(this.props.players);

    return (
      <Row size={1.75} style={{ backgroundColor: 'steelblue', paddingTop: 20 }}>
        <Col size={1.5} style={styles.center}>
          <TurnArrow playerId={playerIds[0]} />
        </Col>
        <Col size={3} style={styles.center}>
          <ScoreCard playerId={playerIds[0]} />
        </Col>
        <Col size={1.5} style={styles.center}>
          <TurnArrow playerId={playerIds[1]} />
        </Col>
        <Col size={3} style={styles.center}>
          <ScoreCard playerId={playerIds[1]} />
        </Col>
        <Col size={0.5}></Col>
      </Row>
    );
  }
}

// Scoreboard.propTypes = {
//   board: PropTypes.array,
//   boardPoints: PropTypes.array,
// };

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);