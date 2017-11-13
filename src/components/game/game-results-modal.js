import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { View, Modal, Text, ActivityIndicator, TouchableHighlight, Platform } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
import HorizontalGraph from '../common/horizontal-graph';
import CointrailIcon from '../common/cointrail_icon';
import * as gameActions from '../../store/actions/game';

const appSS = require('../../styles/app');

function mapStateToProps(state) {
  return {
    game: state.game,
    loading: state.game.loading,
    loaded: state.game.loaded,
    error: state.game.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    endGame: gameActions.endGame,
    startSoloGame: gameActions.startSoloGame,
    playOnlineAgain: gameActions.playOnlineAgain,
  }, dispatch);
};

class GameResultsModal extends React.Component {
  constructor(props) {
    super(props);
  }

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
        visible={this.props.game.gameOver}
        onRequestClose={() => { }}
      >
        <Col size={14/14}>
          
          {/* HEADER */}
          <Row size={2/24}>
            <Col size={14/14} style={[appSS.center, { backgroundColor: '#fff' }]}>
              <Text style={{
                fontWeight: 'bold'
              }}>
                GAME RESULTS
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
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{winner === player1.username ? 'Win' : 'Loss'}</Text>
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
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{winner === player2.username ? 'Win' : 'Loss'}</Text>
                </View>
              </Animatable.View>
            </Col>
          </Row>

          {/* PREVIOUS GAMES */}
          <Row size={12/24}>
            <Col size={14/14}>
              <Row size={4/12} style={{ backgroundColor: '#fff' }}>
                <Col size={14/14}>
                  <HorizontalGraph
                    title={`${player1.username} vs. ${player2.username}`}
                    leftText={this.props.game.winByConnect && winner === player1.username ? `${player1.points} + Cointrail` : `${player1.points}`}
                    leftValue={player1.points}
                    leftColor={player1.color}
                    rightText={this.props.game.winByConnect && winner === player2.username ? `Cointrail + ${player2.points}` : `${player2.points}`}
                    rightValue={player2.points}
                    rightColor={player2.color}
                  />
                </Col>
              </Row>

              <Row size={8/12} style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <CointrailIcon />
              </Row>
            </Col>
          </Row>

          {/* PLAY AGAIN / MAIN MENU */}
          <Row size={2/24} style={{ backgroundColor: '#eee' }}>
            <TouchableHighlight
              underlayColor='#ddd'
              activeOpacity={0.9}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
              onPress={this.props.game.mode === 'solo' ? this.props.startSoloGame : this.props.playOnlineAgain}
            >
              <Text style={{ color: '#aaa', fontWeight: 'bold' }}>Play Again</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#ddd'
              activeOpacity={0.9}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1, borderLeftWidth: 1, borderColor: '#aaa' }}
              onPress={this.props.endGame}
            >
              <Text style={{ color: '#aaa', fontWeight: 'bold' }}>Main Menu</Text>
            </TouchableHighlight>
          </Row>
        </Col>
      </Modal>
    );
  }
}

GameResultsModal.propTypes = {
  game: PropTypes.object,
  startSoloGame: PropTypes.func,
  playOnlineAgain: PropTypes.func,
  endGame: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameResultsModal);