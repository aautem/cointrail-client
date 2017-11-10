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
const styles = require('../../../styles/modals');
const appSS = require('../../../styles/app');
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
            <Col size={8/14} style={[appSS.center]}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>{this.props.stats.gamesPlayed}</Text>
              <Text style={{ color: '#fff' }}>Games Played</Text>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, paddingTop: 20 }}>{this.props.stats.totalPoints}</Text>
              <Text style={{ color: '#fff' }}>Total Points</Text>
            </Col>
          </Row>

          {/* WIN - LOSS - DRAW */}
          <Row size={2/24} style={{ backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{
              color: '#aaa',
              fontWeight: 'bold',
              fontSize: 26,
            }}>
              {this.props.stats.wins} W - {this.props.stats.losses} L - {this.props.stats.draws} T
            </Text>
          </Row>

          {/* USER VS HIGH SCORE GRAPHS */}
          {this.props.stats.gamesPlayed > 0 &&
          <Row size={12/24}>
            <Col size={14/14} style={{ paddingBottom: 15 }}>
              <Row size={4/12} style={{ backgroundColor: '#fff' }}>
                <HorizontalGraph
                  percentage={true}
                  title={'Win Pct Rank: 8'}
                  leftColor={this.props.color}
                  leftValue={Math.round((this.props.stats.wins / this.props.stats.gamesPlayed) * 100)}
                  rightColor='#aaa'
                  rightValue={(Math.round(0.835 * 100)) - (Math.round((this.props.stats.wins / this.props.stats.gamesPlayed) * 100))}
                />
              </Row>
              <Row size={4/12} style={{ backgroundColor: '#fff' }}>
                <HorizontalGraph
                  percentage={false}
                  title={'Pts/Gm Rank: 12'}
                  leftColor={this.props.color}
                  leftValue={this.props.stats.totalPoints / this.props.stats.gamesPlayed}
                  rightColor='#aaa'
                  rightValue={134 - (this.props.stats.totalPoints / this.props.stats.gamesPlayed)}
                />
              </Row>
              <Row size={4/12} style={{ backgroundColor: '#fff' }}>
                <HorizontalGraph
                  percentage={true}
                  title={'Connections/Gm Rank: 4'}
                  leftColor={this.props.color}
                  leftValue={(Math.round((((this.props.stats.wins - this.props.stats.winsByPoints) / this.props.stats.gamesPlayed) * 100)))}
                  rightColor='#aaa'
                  rightValue={(Math.round(43.2)) - (Math.round((((this.props.stats.wins - this.props.stats.winsByPoints) / this.props.stats.gamesPlayed) * 100)))}
                />
              </Row>
            </Col>
          </Row>}

          {!this.props.stats.gamesPlayed &&
          <Row size={12/24} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Get out there and play some games already!</Text>
          </Row>}

          {/* MENU / LOGOUT */}
          <Row size={2/24} style={{ backgroundColor: '#eee' }}>
            <Col size={7/14} style={appSS.center}>
              <TouchableHighlight
                onPress={this.props.closeModal}>
                <Text style={{ color: '#aaa' }}>Menu</Text>
              </TouchableHighlight>
            </Col>
            <Col size={7/14} style={appSS.center}>
              <TouchableHighlight
                onPress={() => { }}>
                <Text style={{ color: '#aaa' }}>Logout</Text>
              </TouchableHighlight>
            </Col>
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