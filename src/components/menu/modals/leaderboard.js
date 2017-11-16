import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as friendsActions from '../../../store/actions/friends';
import * as messagesActions from '../../../store/actions/messages';
import * as leaderboardActions from '../../../store/actions/leaderboard';
import { Dimensions, Modal, View, Text, Slider, Switch, ActivityIndicator, TouchableOpacity, TouchableHighlight, Picker, ScrollView } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar, SearchBar, List, ListItem } from 'react-native-elements';
import { ColorPicker } from 'react-native-color-picker'

const modalSS = require('../../../styles/modals');
const appSS = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const data = [
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
  { username: 'test', avatarUrl: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15380534_10211229273906159_7083414066462096595_n.jpg?oh=9eeef6cf9e9c6b64d68b44597627d88d&oe=5A9ED3B6', stats: { wins: 4, gamesPlayed: 13, totalPoints: 367 }, settings: { color: 'steelblue' }},
];

function mapStateToProps(state) {
  return {
    leaderboard: state.leaderboard.data,
    showModal: state.leaderboard.showLeaderboardModal,
    loading: state.leaderboard.loading,
    loaded: state.leaderboard.loaded,
    error: state.leaderboard.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeLeaderboardModal: leaderboardActions.closeLeaderboardModal,
  }, dispatch);
};

class LeaderboardModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={this.props.closeLeaderboardModal}
      >
        {this.props.loading &&
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
          <ActivityIndicator animating={true} color='#fff' size='large' />
          <Text style={{ color: '#fff' }}>Loading</Text>
        </Col>}

        {!this.props.loading &&
        <Col size={14/14}>

          {/* HEADER */}
          <Row size={2/24} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', borderBottomWidth: 1, borderColor: '#aaa' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Leaderboard</Text>
          </Row>

          <Row size={19/24}>
            <Col size={14/14}>
              <ScrollView>
                <List containerStyle={{ paddingLeft: 5, paddingRight: 5, marginTop: 0 }}>
                  {this.props.leaderboard.map((player, i) => {
                    console.log('Player:', player);
                    return (
                      <ListItem
                        roundAvatar
                        hideChevron={true}
                        avatar={{uri:player.avatarUrl}}
                        key={i}
                        title={player.username.toUpperCase()}
                        titleStyle={{ color: 'black', fontWeight: 'bold' }}
                        subtitle={`${player.stats.gamesPlayed} Games | ${player.stats.wins} Wins | ${player.stats.totalPoints} Points`}
                        badge={{ value: `${((player.stats.wins / player.stats.gamesPlayed) * 100).toFixed(1)}% W`, textStyle: { color: '#fff', fontWeight: 'bold' }, containerStyle: { paddingTop: 5, paddingBottom: 5, backgroundColor: player.settings.color } }}
                      />
                    );
                  })}
                </List>
              </ScrollView>
            </Col>
          </Row>

          {/* BUTTONS */}
          <Row size={3/24} style={{ justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#eee', borderTopWidth: 2, borderColor: '#aaa' }}>
            <Button
              title='Main Menu'
              backgroundColor='#ccc'
              borderRadius={5}
              buttonStyle={{ width: '100%', borderWidth: 1, borderColor: '#aaa', width: 150 }}
              textStyle={{ color: 'black', fontWeight: 'bold' }}
              onPress={this.props.closeLeaderboardModal}
            />
          </Row>

        </Col>}
      </Modal>
    );
  }
}

LeaderboardModal.propTypes = {
  showModal: PropTypes.bool,
  closeLeaderboardModal: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardModal);