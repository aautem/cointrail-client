import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { View, Modal, Text, ActivityIndicator } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
const appSS = require('../../../styles/app');

export default class GameResultsModal extends React.Component {
  render() {
    if (!this.props.game.roomName) {
      return null;
    }

    const usernames = Object.keys(this.props.game.players);
    const player1 = this.props.game.players[usernames[0]];
    const player2 = this.props.game.players[usernames[1]];

    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={() => { }}
      >
        <Col size={14/14}>

          {/* MENU BAR */}
          <Row size={1/24}></Row>
          
          {/* HEADER */}
          <Row size={1/24}>
            <Col size={14/14} style={appSS.center}>
              <Text>{this.props.game.winner ? this.props.game.winner.toUpperCase() : ''} WINS</Text>
            </Col>
          </Row>

          {/* CURRENT GAME */}
          <Row size={7/24} style={{ backgroundColor: player2 ? player2.gamePieceColor : '#aaa' }}>

            {/* LEFT PLAYER */}
            <Col size={7.85/14} style={{ backgroundColor: player1 ? player1.gamePieceColor : '#aaa', overflow: 'hidden', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Animatable.View animation={'slideInLeft'}>
                <Avatar
                  xlarge
                  source={{uri: player1 ? player1.avatarUrl : ''}}
                  activeOpacity={0.8}
                  avatarStyle={{ borderTopRightRadius: 50, overflow: 'hidden' }}
                  containerStyle={{ borderTopRightRadius: 50, overflow: 'hidden' }}
                  overlayContainerStyle={{ borderTopRightRadius: 50, overflow: 'hidden' }}
                />
                <View style={{ backgroundColor: player1 ? player1.gamePieceColor : '#aaa', width: 80, height: 30, alignSelf: 'flex-end', justifyContent: 'center', marginTop: -30, borderTopLeftRadius: 30, overflow: 'hidden' }}>
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{player1 ? player1.points : 0}</Text>
                </View>
              </Animatable.View>
            </Col>

            {/* VS */}
            <Col size={0.3/14} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
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
              </View>
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
                <View style={{ backgroundColor: player2 ? player2.gamePieceColor : '#aaa', width: 80, height: 30, alignSelf: 'flex-start', justifyContent: 'center', marginTop: -30, borderTopRightRadius: 30, overflow: 'hidden' }}>
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{player2 ? player2.points : 0}</Text>
                </View>
              </Animatable.View>
            </Col>
          </Row>

          {/* PREVIOUS GAMES */}
          <Row size={12/24}>
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
                        backgroundColor: player1 ? player1.gamePieceColor : '#aaa',
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
                        backgroundColor: player2 ? player2.gamePieceColor : '#aaa',
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
                      backgroundColor: player1 ? player1.gamePieceColor : '#aaa',
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>206</Text>
                    </Col>
                    <Col size={301} style={{
                      backgroundColor: player2 ? player2.gamePieceColor : '#aaa',
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
                      backgroundColor: player1 ? player1.gamePieceColor : '#aaa',
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>121</Text>
                    </Col>
                    <Col size={98} style={{
                      backgroundColor: player2 ? player2.gamePieceColor : '#aaa',
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
          <Row size={3/24} style={[{ justifyContent: 'center' }]}>
            <Button
              large
              title='Next Game'
              onPress={() => { /* this.props.startNextGame */ }}
              backgroundColor='#aaa'
              color='#fff'
              borderRadius={5}
              containerViewStyle={{ borderRadius: 5 }}
              loading={this.props.loading}
            />
          </Row>
        </Col>
      </Modal>
    );
  }
}

GameResultsModal.propTypes = {
  showModal: PropTypes.bool,
  game: PropTypes.object,
  startNextGame: PropTypes.func,
  loading: PropTypes.bool,
};