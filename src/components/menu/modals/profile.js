import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Modal, Text, Slider, Switch, ActivityIndicator, TouchableHighlight, Dimensions } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
import HorizontalGraph from '../../common/horizontal-graph';
import * as userActions from '../../../store/actions/user';
import * as statsActions from '../../../store/actions/stats';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    color: state.settings.color,
    showModal: state.user.showModal,
    id: state.user.id,
    username: state.user.username,
    avatarUrl: state.user.avatarUrl,
    stats: state.stats,
    loading: state.user.loading,
    loaded: state.user.loaded,
    error: state.user.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal: userActions.closeModal,
    loadStats: statsActions.loadStats,
  }, dispatch);
};

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.props.loadStats(this.props.username);
    }
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={this.props.closeModal}
      >
        <Col size={14/14}>
          
          {/* PICTURE / STATS */}
          <Row size={8/24} style={{ backgroundColor: this.props.color }}>
            <Col size={6/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                height={viewportHeight / 5}
                rounded
                source={{uri: this.props.avatarUrl}}
                activeOpacity={0.8}
              />
              <Text style={{ textAlign: 'center', paddingTop: 10, color: '#fff', fontWeight: 'bold' }}>
                {this.props.username ? this.props.username.toUpperCase() : null}
              </Text>
            </Col>
            <Col size={8/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
              {/* <Text style={{ color: '#fff' }}>Overall Rank</Text>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>12</Text> */}

              <Text style={{ color: '#fff' }}>Games Played</Text>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>{this.props.stats.gamesPlayed}</Text>

              <Text style={{ color: '#fff', paddingTop: 10 }}>Points per Game</Text>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>{this.props.stats.gamesPlayed ? (this.props.stats.totalPoints / this.props.stats.gamesPlayed) : 'N/A'}</Text>

              <Text style={{ color: '#fff', paddingTop: 10 }}>Total Points</Text>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>{this.props.stats.totalPoints}</Text>
            </Col>
          </Row>

          {/* WIN - LOSS - DRAW */}
          <Row size={2/24} style={{ backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{color: 'black', fontSize: 26, fontWeight: 'bold' }}>
              {this.props.stats.wins + ' '}
            </Text>
            <Text style={{ fontSize: 26 }}>
              {'W / '}
            </Text>
            <Text style={{ color: 'black', fontSize: 26, fontWeight: 'bold' }}>
              {this.props.stats.losses + ' '}
            </Text>
            <Text style={{ fontSize: 26 }}>
              {'L / '}
            </Text>
            <Text style={{color: 'black', fontSize: 26, fontWeight: 'bold' }}>
              {this.props.stats.draws + ' '}
            </Text>
            <Text style={{ fontSize: 26 }}>
              {'T'}
            </Text>
          </Row>

          {/* USER STATS/SCORE GRAPHS */}
          {this.props.stats.wins > 0 &&
          <Row size={12/24}>
            <Col size={14/14} style={{ paddingBottom: 15 }}>
              <Row size={4/12} style={{ backgroundColor: '#fff' }}>
                <HorizontalGraph
                  title={'Win Percentage'}
                  leftText={`${((this.props.stats.wins / this.props.stats.gamesPlayed) * 100).toFixed(1)}%`}
                  leftValue={(this.props.stats.wins / this.props.stats.gamesPlayed) * 100}
                  leftColor={this.props.color}
                  rightText={`${100}%`}
                  rightValue={100 - ((this.props.stats.wins / this.props.stats.gamesPlayed) * 100)}
                  rightColor={'#aaa'}
                />
              </Row>
              <Row size={4/12} style={{ backgroundColor: '#fff' }}>
                <HorizontalGraph
                  title={'Wins by Points'}
                  leftText={`${this.props.stats.winsByPoints}`}
                  leftValue={this.props.stats.winsByPoints}
                  leftColor={this.props.stats.winsByPoints ? this.props.color : '#aaa'}
                  rightText={`${this.props.stats.wins}`}
                  rightValue={this.props.stats.wins - this.props.stats.winsByPoints}
                  rightColor={this.props.stats.winsByPoints === this.props.stats.wins ? this.props.color : '#aaa'}
                />
              </Row>
              <Row size={4/12} style={{ backgroundColor: '#fff' }}>
                <HorizontalGraph
                  title={'Wins by Cointrail'}
                  leftText={`${this.props.stats.winsByConnect}`}
                  leftValue={this.props.stats.winsByConnect}
                  leftColor={this.props.stats.winsByConnect ? this.props.color : '#aaa'}
                  rightText={`${this.props.stats.wins}`}
                  rightValue={this.props.stats.wins - this.props.stats.winsByConnect}
                  rightColor={this.props.stats.winsByConnect === this.props.stats.wins ? this.props.color : '#aaa'}
                />
              </Row>
            </Col>
          </Row>}

          {!this.props.stats.wins &&
          <Row size={12/24} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Get out there and get some wins already!</Text>
          </Row>}

          {/* MENU / LOGOUT */}
          <Row size={2/24} style={{ backgroundColor: '#eee' }}>
            <TouchableHighlight
              underlayColor='#ddd'
              activeOpacity={0.9}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
              onPress={this.props.closeModal}
            >
              <Text style={{ color: '#aaa', fontWeight: 'bold' }}>Menu</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor='#ddd'
              activeOpacity={0.9}
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1, borderLeftWidth: 1, borderColor: '#aaa' }}
              onPress={() => { alert('Logging out...') }}
            >
              <Text style={{ color: '#aaa', fontWeight: 'bold' }}>Logout</Text>
            </TouchableHighlight>
          </Row>

        </Col>
      </Modal>
    );
  }
}

ProfileModal.propTypes = {
  showModal: PropTypes.bool,
  id: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  stats: PropTypes.object,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  loadStats: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);