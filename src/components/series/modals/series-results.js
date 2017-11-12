import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { View, Modal, Text, ActivityIndicator, TouchableHighlight, Platform } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
import * as seriesActions from '../../../store/actions/series';
const appSS = require('../../../styles/app');

function mapStateToProps(state) {
  return {
    series: state.series,
    showModal: state.series.showResultsModal,
    loading: state.series.loading,
    loaded: state.series.loaded,
    error: state.series.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    endSeries: seriesActions.endSeries,
  }, dispatch);
};

class SeriesResultsModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.series.gameOver) {
      return null;
    }

    const usernames = Object.keys(this.props.series.players);
    const winner = this.props.series.winner;
    const loser = winner === usernames[0] ? usernames[1] : usernames[0];
    const player1 = this.props.series.players[usernames[0]];
    const player2 = this.props.series.players[usernames[1]];

    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={() => {}}
      >
        <Col size={14/14}>
          
          {/* HEADER */}
          <Row size={1/24}>
            <Col size={14/14} style={[appSS.center, { backgroundColor: '#fff' }]}>
              <Text style={{
                fontWeight: 'bold',
                color: this.props.series.players[winner].color,
              }}>
                {this.props.series.winner.toUpperCase()} WINS BY {this.props.series.winByPoints ? 'POINTS' : 'COINTRAIL'}
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
            <Col size={14/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>Series Complete.</Text>
            </Col>
          </Row>

          {/* NEXT BUTTON */}
          <Row size={2/24}>
            <TouchableHighlight
              style={{ alignItems: 'center', flex: 1, backgroundColor: '#eee' }}
              underlayColor='#ddd'
              activeOpacity={0.9}
              onPress={this.props.endSeries}
            >
              <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.props.loading &&
                <ActivityIndicator animating={true} color='#aaa' size='small' />}
                <Text style={{ color: '#aaa', fontWeight: 'bold' }}>Menu</Text>
              </Row>
            </TouchableHighlight>
          </Row>
        </Col>
      </Modal>
    );
  }
}

SeriesResultsModal.propTypes = {
  series: PropTypes.object,
  showModal: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};