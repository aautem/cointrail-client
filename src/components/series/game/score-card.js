import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-native-easy-grid';
import { Text, Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
const appSS = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class ScoreCard extends React.Component {
  render() {
    if (!this.props.player) {
      return null;
    }

    const player = this.props.player;
    return (
      <Row size={2/2} style={{ alignItems: 'center' }}>
        <Avatar
          height={viewportHeight / 12}
          source={{uri: player.avatarUrl}}
          activeOpacity={0.7}
        />
      </Row>






      // <Col size={5/7}>
      //   <Row style={appSS.center}>
      //     <Avatar
      //       height={36}
      //       source={{uri: player.avatarUrl}}
      //       activeOpacity={0.7}
      //     />
      //     <Col>
      //       <Row size={1/3} style={appSS.center}>
      //         <Text style={{ color: '#fff', marginTop: 20 }}>{player.username}</Text>
      //       </Row>
      //       <Row size={2/3} style={appSS.center}>
      //         <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{player.points}</Text>
      //       </Row>
      //     </Col>
      //   </Row>
      // </Col>
    );
  }
}

ScoreCard.propTypes = {
  player: PropTypes.object,
};