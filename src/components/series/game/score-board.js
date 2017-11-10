import React from 'react';
import PropTypes from 'prop-types';
import TurnArrow from './turn-arrow';
import ScoreCard from './score-card';
import { Text, Dimensions } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Avatar, Icon } from 'react-native-elements';
const appSS = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class ScoreBoard extends React.Component {
  render() {
    if (!this.props.game.roomName) {
      return null;
    }

    const players = this.props.game.players;
    const usernames = Object.keys(this.props.game.players);

    return (
      <Row size={2/16}>
        <Col size={7/14} style={[{ backgroundColor: players[usernames[0]].color }]}>
          <Row size={2/2} style={{ alignItems: 'center' }}>
            <Avatar
              height={viewportHeight / 12}
              source={{uri: players[usernames[0]].avatarUrl}}
              activeOpacity={0.7}
            />
            {this.props.game.turn === usernames[0] &&
            <Icon
              size={36}
              name='keyboard-arrow-left'
              type='material'
              color={this.props.game.turn === usernames[0] ? '#fff' : '#aaa'}
            />}
            <Col style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 30 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24 }}>{players[usernames[0]].points}</Text>
            </Col>
          </Row>
        </Col>
        <Col size={7/14} style={[{ backgroundColor: players[usernames[1]].color }]}>
          <Row size={2/2} style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Col style={{ alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 30 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24 }}>{players[usernames[1]].points}</Text>
            </Col>
            {this.props.game.turn === usernames[1] &&
            <Icon
              size={36}
              name='keyboard-arrow-right'
              type='material'
              color='#fff'
            />}
            <Avatar
              height={viewportHeight / 12}
              source={{uri: players[usernames[1]].avatarUrl}}
              activeOpacity={0.7}
            />
          </Row>
        </Col>
      </Row>
    );
  }
}

ScoreBoard.propTypes = {
  game: PropTypes.object,
};