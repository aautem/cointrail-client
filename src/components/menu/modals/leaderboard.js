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
          <Row size={2/24} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Leaderboard</Text>
          </Row>

          <Row size={19/24}>
            <Col size={14/14}>
              <List>
                {this.props.leaderboard.map((player, i) => {
                  console.log('Player:', player);
                  return (
                    <ListItem
                      roundAvatar
                      hideChevron={true}
                      avatar={{uri:player.avatarUrl}}
                      key={i}
                      title={player.username}
                      titleStyle={{ color: 'black' }}
                      subtitle={`${player.stats.gamesPlayed} Games | ${player.stats.wins} Wins | ${player.stats.totalPoints} Points`}
                      badge={{ value: `${(player.stats.wins / player.stats.gamesPlayed).toFixed(1) * 100}% W`, textStyle: { color: '#fff' }, containerStyle: { paddingTop: 5, paddingBottom: 5 } }}
                    />
                  );
                })}
              </List>
            </Col>
          </Row>

          {/* BUTTONS */}
          <Row size={3/24} style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Button
              title='Menu'
              backgroundColor='#eee'
              borderRadius={5}
              buttonStyle={{ width: '100%' }}
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