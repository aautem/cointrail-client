import React from 'react';
import PropTypes from 'prop-types';
import { Text, Dimensions } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Avatar, Icon } from 'react-native-elements';

const appSS = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class ScoreBoard extends React.Component {
  render() {
    const players = this.props.game.players;
    const usernames = Object.keys(players);

    console.log('Players/Usernames:', players, usernames);
    
    return (
      <Row size={2/16}>
        <Col size={7/14} style={[{ backgroundColor: players[usernames[0]].color }]}>
          <Row size={2/2} style={{ alignItems: 'center' }}>
            <Avatar
              rounded
              height={viewportHeight / 12}
              source={{uri: players[usernames[0]].avatarUrl}}
              activeOpacity={0.7}
            />
            {this.props.game.turn === usernames[0] &&
            <Icon
              size={36}
              name='keyboard-arrow-left'
              type='material'
              color='#fff'
            />}
            <Col style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingRight: 10 }}>
                {players[usernames[0]].points}
              </Text>
              <Text style={{ color: '#fff', fontWeight: 'bold', paddingRight: 10 }}>{usernames[0]}</Text>
            </Col>
          </Row>
        </Col>
        <Col size={7/14} style={[{ backgroundColor: players[usernames[1]].color }]}>
          <Row size={2/2} style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
            <Col style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24, paddingLeft: 10 }}>
                {players[usernames[1]].points}
              </Text>
              <Text style={{ color: '#fff', fontWeight: 'bold', paddingLeft: 10 }}>{usernames[1]}</Text>
            </Col>
            {this.props.game.turn === usernames[1] &&
            <Icon
              size={36}
              name='keyboard-arrow-right'
              type='material'
              color='#fff'
            />}
            <Avatar
              rounded
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