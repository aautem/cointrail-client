import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Avatar, Card } from 'react-native-elements';

const styles = require('../../styles/app');

function mapStateToProps(state, ownProps) {
  return {
    username: state.game.players[ownProps.playerId].username,
    avatarUrl: state.game.players[ownProps.playerId].avatarUrl,
    score: state.game.players[ownProps.playerId].score,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class ScoreCard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Row style={[styles.center, { backgroundColor: '#fff', marginTop: 20, marginBottom: 20 }]}>
        <Col size={1} style={styles.center}>
          <Avatar
            medium
            source={{uri: this.props.avatarUrl}}
            activeOpacity={0.7}
          />
        </Col>
        <Col size={2} style={styles.center}>
          <Row style={styles.center}>
            <Text>{this.props.username}</Text>
          </Row>
          <Row style={styles.center}>
            <Text style={{ color: 'steelblue', fontWeight: 'bold', fontSize: 18 }}>{this.props.score}</Text>
          </Row>
        </Col>
      </Row>
    );
  }
}

ScoreCard.propTypes = {
  playerId: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  score: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard);