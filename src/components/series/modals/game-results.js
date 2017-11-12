import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { View, Modal, Text, ActivityIndicator, TouchableHighlight, Platform } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
const appSS = require('../../../styles/app');

export default class GameResultsModal extends React.Component {
  render() {
    if (!this.props.game.gameOver) {
      return null;
    }

    const usernames = Object.keys(this.props.game.players);
    const winner = this.props.game.winner;
    const loser = winner === usernames[0] ? usernames[1] : usernames[0];
    const player1 = this.props.game.players[usernames[0]];
    const player2 = this.props.game.players[usernames[1]];

    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={() => { }}
      >
        <Col size={14/14}>
          
          {/* HEADER */}
          <Row size={1/24}>
            <Col size={14/14} style={[appSS.center, { backgroundColor: '#fff' }]}>
              <Text style={{
                fontWeight: 'bold',
                color: this.props.game.players[winner].color,
              }}>
                {this.props.game.winner.toUpperCase()} WINS BY {this.props.game.winByPoints ? 'POINTS' : 'COINTRAIL'}
              </Text>
            </Col>
          </Row>

          {/* CURRENT GAME */}
          <Row size={8/24} style={{ backgroundColor: player2 ? player2.color : '#aaa' }}>

            {/* LEFT PLAYER */}
            <Col size={7.85/14} style={{ backgroundColor: player1 ? player1.color : '#aaa', overflow: 'hidden', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Animatable.View animation={'slideInLeft'}>
                <Avatar
                  xlarge
                  source={{uri: player1 ? player1.avatarUrl : ''}}
                  activeOpacity={0.8}
                  avatarStyle={{ borderTopRightRadius: 50, overflow: 'hidden' }}
                  containerStyle={{ borderTopRightRadius: 50, overflow: 'hidden' }}
                  overlayContainerStyle={{ borderTopRightRadius: 50, overflow: 'hidden' }}
                />
                <View style={{ backgroundColor: player1 ? player1.color : '#aaa', width: 80, height: 30, alignSelf: 'flex-end', justifyContent: 'center', marginTop: -30, borderTopLeftRadius: 30, overflow: 'hidden' }}>
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{player1 ? player1.points : 0}</Text>
                </View>
              </Animatable.View>
            </Col>

            {/* VS */}
            <Col size={0.3/14} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
              {Platform.OS === 'ios' &&
              <View style={{
                width: 50,
                height: 50,
                backgroundColor: '#fff',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <Text style={{ fontWeight: 'bold' }}>VS</Text>
              </View>}
            </Col>

            {/* RIGHT PLAYER */}
            <Col size={7.85/14} style={{ alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
              <Animatable.View animation={'slideInRight'}>
                <Avatar
                  xlarge
                  source={{uri: player2 ? player2.avatarUrl : ''}}
                  activeOpacity={0.8}
                  avatarStyle={{ borderTopLeftRadius: 50, overflow: 'hidden' }}
                  containerStyle={{ borderTopLeftRadius: 50, overflow: 'hidden' }}
                  overlayContainerStyle={{ borderTopLeftRadius: 50, overflow: 'hidden' }}
                />
                <View style={{ backgroundColor: player2 ? player2.color : '#aaa', width: 80, height: 30, alignSelf: 'flex-start', justifyContent: 'center', marginTop: -30, borderTopRightRadius: 30, overflow: 'hidden' }}>
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{player2 ? player2.points : 0}</Text>
                </View>
              </Animatable.View>
            </Col>
          </Row>

          {/* PREVIOUS GAMES */}
          <Row size={13/24}>
            <Col size={14/14}>
              <Row size={4/13} style={{ backgroundColor: '#fff' }}>
                <Col size={14/14}>
                  <Row size={1.5/4}>
                    <Col size={14/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text>Current Game</Text>
                    </Col>
                  </Row>
                  <Row size={2.5/4} style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Animatable.View
                      animation={'slideInRight'}
                      style={{
                        backgroundColor: player1 ? player1.color : '#aaa',
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        flex: player1 ? player1.points : 1,
                      }}
                    >
                      <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>{player1 ? player1.points : 0}</Text>
                    </Animatable.View>
                    <Animatable.View
                      animation={'slideInLeft'}
                      style={{
                        backgroundColor: player2 ? player2.color : '#aaa',
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        flex: player2 ? player2.points : 1,
                      }}
                    >
                      <Text style={{ color: '#fff', paddingRight: 10, fontWeight: 'bold', textAlign: 'right' }}>{player2 ? player2.points : 0}</Text>
                    </Animatable.View>
                  </Row>
                </Col>
              </Row>
              <Row size={4/13} style={{ backgroundColor: '#fff' }}>
                <Col size={14/14}>
                  <Row size={1.5/4}>
                    <Col size={14/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text>Game 5</Text>
                    </Col>
                  </Row>
                  <Row size={2.5/4} style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Col size={206} style={{
                      backgroundColor: player1 ? player1.color : '#aaa',
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>206</Text>
                    </Col>
                    <Col size={301} style={{
                      backgroundColor: player2 ? player2.color : '#aaa',
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingRight: 10, fontWeight: 'bold', textAlign: 'right' }}>301</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row size={4/13} style={{ backgroundColor: '#fff' }}>
                <Col size={14/14}>
                  <Row size={1.5/4}>
                    <Col size={14/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text>Game 6</Text>
                    </Col>
                  </Row>
                  <Row size={2.5/4} style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Col size={121} style={{
                      backgroundColor: player1 ? player1.color : '#aaa',
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>121</Text>
                    </Col>
                    <Col size={98} style={{
                      backgroundColor: player2 ? player2.color : '#aaa',
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingRight: 10, fontWeight: 'bold', textAlign: 'right' }}>98</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* NEXT BUTTON */}
          <Row size={2/24}>
            <TouchableHighlight
              style={{ alignItems: 'center', flex: 1, backgroundColor: '#eee' }}
              underlayColor='#ddd'
              activeOpacity={0.9}
              onPress={this.props.handleButtonPress}
            >
              <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.props.loading &&
                <ActivityIndicator animating={true} color='#aaa' size='small' />}
                <Text style={{ color: '#aaa', fontWeight: 'bold' }}>
                  {this.props.game.mode === 'solo' ? 'Menu' : 'Continue'}
                </Text>
              </Row>
            </TouchableHighlight>
          </Row>
        </Col>
      </Modal>
    );
  }
}

GameResultsModal.propTypes = {
  handleButtonPress: PropTypes.func,
  showModal: PropTypes.bool,
  game: PropTypes.object,
  startNextGame: PropTypes.func,
  loading: PropTypes.bool,
};