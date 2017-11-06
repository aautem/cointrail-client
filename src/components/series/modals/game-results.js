import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, ActivityIndicator } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
const _appSS = require('../../../styles/app');

export default class GameResultsModal extends React.Component {
  render() {
    const usernames = Object.keys(this.props.game.players);
    const player1 = this.props.game.players[usernames[0]];
    const player2 = this.props.game.players[usernames[1]];

    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={() => { }}
      >
        <Grid>
          <Col style={[_appSS.center, { backgroundColor: '#fff', paddingTop: 20, paddingBottom: 20 }]}>
            <Text style={{ flex: 1, flexDirection: 'row' }}>{`${this.props.game.winner} WINS!`}</Text>
            <Row>
              <Col size={3}>
                <Avatar
                  xlarge
                  source={{uri: player1.avatarUrl}}
                  activeOpacity={0.8}
                />
                <Text style={{ flex: 1, flexDirection: 'row' }}>{player1.points}</Text>
              </Col>
              <Col>
                <Text style={{ flex: 1, flexDirection: 'row' }}>VS</Text>
              </Col>
              <Col size={3}>
                <Avatar
                  xlarge
                  source={{uri: player2.avatarUrl}}
                  activeOpacity={0.8}
                />
                <Text style={{ flex: 1, flexDirection: 'row' }}>{player2.points}</Text>
              </Col>
            </Row>
            <Text style={{ flex: 1, flexDirection: 'row' }}>SERIES RESULTS</Text>
            <Text style={{ flex: 1, flexDirection: 'row' }}>GM 1</Text>
            <Row>
              <Col size={player1.points} style={{ backgroundColor: player1.gamePieceColor}}>
                <Text style={{ flex: 1, flexDirection: 'row' }}>{player1.points}</Text>
              </Col>
              <Col size={player2.points} style={{ backgroundColor: player2.gamePieceColor}}>
                <Text style={{ flex: 1, flexDirection: 'row' }}>{player2.points}</Text>
              </Col>
            </Row>
            <Button
              title='NEXT GAME'
              onPress={() => { console.log('*** LOADING NEXT GAME ***') }}
              backgroundColor='steelblue'
              color='#fff'
            />
          </Col>
        </Grid>
      </Modal>
    );
  }
}

GameResultsModal.propTypes = {
  showModal: PropTypes.bool,
  game: PropTypes.object,
};