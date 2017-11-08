import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Avatar } from 'react-native-elements';
const _appSS = require('../../../styles/app');

export default class ScoreCard extends React.Component {
  render() {
    const player = this.props.player;

    return (
      <Row style={[_appSS.center, { backgroundColor: '#fff', marginTop: 20, marginBottom: 20 }]}>
        <Col size={1} style={_appSS.center}>
          <Avatar
            medium
            source={{uri: player ? player.avatarUrl : null}}
            activeOpacity={0.7}
          />
        </Col>
        <Col size={2} style={_appSS.center}>
          <Row style={_appSS.center}>
            <Text>{player ? player.username : null}</Text>
          </Row>
          <Row style={_appSS.center}>
            <Text style={{ color: 'steelblue', fontWeight: 'bold', fontSize: 18 }}>
              {player ? player.points : null}
            </Text>
          </Row>
        </Col>
      </Row>
    );
  }
}

ScoreCard.propTypes = {
  player: PropTypes.object,
};