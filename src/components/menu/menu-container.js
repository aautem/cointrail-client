import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../store/actions/settings';
import * as userActions from '../../store/actions/user';
import * as appActions from '../../store/actions/app';
import * as gameActions from '../../store/actions/game';
import * as friendsActions from '../../store/actions/friends';
import * as messagesActions from '../../store/actions/messages';
import * as constants from '../../utilities/const';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';
import { Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Header, Button, Icon } from 'react-native-elements';
import CointrailIcon from '../common/cointrail_icon';
import HeaderIcon from './header-icon';
import SettingsModal from './modals/settings';
import ProfileModal from './modals/profile';
import AddFriendModal from './modals/add-friend';
import MessagesModal from './modals/messages';
import FriendsContainer from './friends/friends-container';
import MenuButton from './menu-button';
import GameRequestModal from './modals/game-request';
import FriendComponent from './friends/friend';

const appSS = require('../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    user: state.user,
    onlineCount: state.app.onlineCount,
    friends: state.friends.data,
    friendsOnline: state.friends.onlineCount,
    showRequestModal: state.game.showRequestModal,

    userLoading: state.user.loading,
    userLoaded: state.user.loaded,
    userError: state.user.error,
    gameLoading: state.game.loading,
    gameLoaded: state.game.loaded,
    gameError: state.game.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startSoloGame: gameActions.startSoloGame,
    joinGame: gameActions.joinGame,
    cancelGameRequest: gameActions.cancelGameRequest,
    openSettingsModal: settingsActions.openModal,
    openProfileModal: userActions.openModal,
    openAddFriendModal: friendsActions.openAddFriendModal,
    openMessagesModal: messagesActions.openMessagesModal,
  }, dispatch);
};

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem({item, index}) {
    if (item.btn) {
      return (
        <Button
          title='Add Friend'
          icon={{ name: 'add-circle', type: 'material', color: '#fff' }}
          onPress={this.props.openAddFriendModal}
          containerViewStyle={{ borderRadius: 5, paddingTop: viewportHeight / 8 }}
          buttonStyle={{ borderRadius: 5 }}
        />
      );
    }
    return (
      <FriendComponent username={item.username} image={item.avatar} color={item.color} />
    );
  }

  render() {
    if (this.props.userLoading || this.props.gameLoading) {
      return (
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
          <ActivityIndicator animating={true} color='#fff' size='large' />
          <Text style={{ color: '#fff' }}>Loading</Text>
        </Col>
      );
    }

    if (this.props.userError || this.props.gameError) {
      return (
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
          <Text style={{ color: 'red' }}>{this.props.userError || this.props.gameError}</Text>
        </Col>
      );
    }

    return (
      <Col size={14/14}>

        {/* FRIENDS CONTAINER */}
        <Row size={10/24} style={[appSS.center, { backgroundColor: '#eee' }]}>
          <Col size={14/14}>
            <Row size={2/10}>
              <Col size={7/14}>
                <Row size={2/2} style={{ paddingLeft: 10, paddingRight: 10, backgroundColor: '#ddd' }}>
                  <Text style={{ textAlign: 'left', textAlignVertical: 'center', fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    {this.props.user.username.toUpperCase()}
                  </Text>
                </Row>
              </Col>
              <Col size={7/14}>
                <Row size={2/2} style={{ paddingLeft: 10, paddingRight: 10, backgroundColor: '#ddd', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <Icon
                    size={24}
                    name='account-circle'
                    type='material'
                    color='black'
                    style={{ paddingRight: 5 }}
                    onPress={this.props.openProfileModal}
                  />
                  <Icon
                    size={24}
                    name='settings'
                    type='material'
                    color='black'
                    onPress={this.props.openSettingsModal}
                  />
                </Row>
              </Col>
            </Row>

            <Row size={8/10} style={{ paddingBottom: 3, paddingTop: 5, borderColor: 'black', borderTopWidth: 3, borderBottomWidth: 5, borderLeftWidth: 0, borderRightWidth: 0 }}>

              {/* FRIENDS ARE LOADING */}
              {this.props.friends.loading &&
              <Col size={14/14} style={appSS.center}>
                <ActivityIndicator animating={true} color='black' size='large' />
              </Col>}
              
              {/* FRIENDS CAROUSEL */}
              {!this.props.friends.loading && this.props.friends.length > 0 &&
              <Carousel
                ref={(c) => { this._carousel = c }}
                data={this.props.friends.concat([{ btn: true }])}
                renderItem={this.renderItem.bind(this)}
                sliderWidth={viewportWidth}
                itemWidth={150}
                activeSlideAlignment='start'
                inactiveSlideOpacity={0.60}
                inactiveSlideScale={0.80}
                inactiveSlideShift={0}
              />}
              
              {/* NO FRIENDS MESSAGE */}
              {!this.props.friends.loading && !this.props.friends.length &&
              <Col size={14/14} style={appSS.center}>
                <Text style={{ paddingBottom: 10 }}>Your friends will be displayed here!</Text>
                <Button
                  title='Add Friend'
                  icon={{ name: 'add-circle', type: 'material', color: '#fff' }}
                  onPress={this.props.openAddFriendModal}
                  containerViewStyle={{ borderRadius: 5 }}
                  buttonStyle={{ borderRadius: 5 }}
                />
              </Col>}

            </Row>
          </Col>
        </Row>

        <Row size={14/24}>
          <Col size={8/14}>

            <Row size={14/14}>
              <Col size={8/8} style={{ backgroundColor: '#fff' }}>

                {/* ONLINE INFO */}
                <Row size={12/14} style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingTop: 20 }}>
                  <Col size={8/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 16 }}>Players Online</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24, paddingBottom: 20 }}>
                      {this.props.onlineCount}
                    </Text>

                    <Text style={{ color: 'black', fontSize: 16 }}>Friends Online</Text>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24 }}>
                      {`${this.props.friendsOnline} / ${this.props.friends.length}`}
                    </Text>
                  </Col>
                </Row>

                {/* HELP AND INFO ICONS */}
                <Row size={2/14} style={{ justifyContent: 'flex-start', alignItems: 'flex-end', backgroundColor: '#fff', paddingLeft: 10, paddingBottom: 10 }}>
                  <Icon
                    size={32}
                    name='help-circle'
                    type='material-community'
                    color='#ddd'
                    onPress={() => { alert('Help') }}
                  />
                  <Icon
                    size={32}
                    name='information'
                    type='material-community'
                    color='#ddd'
                    style={{ paddingLeft: 5 }}
                    onPress={() => { alert('(c) 2017 Alex Autem') }}
                  />
                </Row>
              
              </Col>
            </Row>

          </Col>
          <Col size={6/14}>

            {/* BUTTONS CONTAINER */}
            <Row size={14/14} style={[{ backgroundColor: '#fff' }]}>
              <Col size={6/6} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                <Button
                  backgroundColor='#ddd'
                  color='black'
                  iconRight={{ type: 'material-community', name: 'account-multiple', color: 'black' }}
                  title='JOIN'
                  onPress={this.props.joinGame}
                  textStyle={{ fontWeight: 'bold', fontSize: 16 }}
                  containerViewStyle={{ marginRight: 0, borderTopLeftRadius: 100, borderBottomLeftRadius: 5, paddingBottom: 5 }}
                  buttonStyle={{ width: '100%', height: 60, borderTopLeftRadius: 100, borderBottomLeftRadius: 5, justifyContent: 'flex-end', paddingRight: 20 }}
                />
                <Button
                  backgroundColor='#ddd'
                  color='black'
                  iconRight={{ type: 'material-community', name: 'account', color: 'black' }}
                  title='SOLO'
                  onPress={this.props.startSoloGame}
                  textStyle={{ fontWeight: 'bold', fontSize: 16 }}
                  containerViewStyle={{ marginRight: 0, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, paddingBottom: 5 }}
                  buttonStyle={{ width: '100%', height: 60, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'flex-end', paddingRight: 20 }}
                />
                <Button
                  backgroundColor='#ddd'
                  color='black'
                  iconRight={{ type: 'ionicon', name: 'md-stats', color: 'black' }}
                  title='LEADERS'
                  onPress={() => { alert('Leaderboard') }}
                  textStyle={{ fontWeight: 'bold', fontSize: 16 }}
                  containerViewStyle={{ marginRight: 0, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, paddingBottom: 5 }}
                  buttonStyle={{ width: '100%', height: 60, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'flex-end', paddingRight: 20 }}
                /> 
                <Button
                  backgroundColor='#ddd'
                  color='black'
                  iconRight={{ type: 'material-community', name: 'message-text-outline', color: 'black' }}
                  title='INBOX'
                  onPress={this.props.openMessagesModal}
                  textStyle={{ fontWeight: 'bold', fontSize: 16 }}
                  containerOverlayStyle={{ paddingBottom: 20 }}
                  containerViewStyle={{ marginRight: 0, borderBottomLeftRadius: 100, borderTopLeftRadius: 5 }}
                  buttonStyle={{ width: '100%', height: 60, borderBottomLeftRadius: 100, borderTopLeftRadius: 5, justifyContent: 'flex-end', paddingRight: 20 }}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        {/* MODALS */}
        <SettingsModal />
        <ProfileModal />
        <AddFriendModal />
        <MessagesModal />
        <GameRequestModal
          showModal={this.props.showRequestModal}
          cancel={this.props.cancelGameRequest}
        />
      </Col>
    );
  }
}

MenuContainer.propTypes = {
  user: PropTypes.object,
  startSoloGame: PropTypes.func,
  joinGame: PropTypes.func,
  cancelGameRequest: PropTypes.func,
  openSettingsModal: PropTypes.func,
  openProfileModal: PropTypes.func,
  showRequestModal: PropTypes.bool,
  gameLoading: PropTypes.bool,
  gameLoaded: PropTypes.bool,
  gameError: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);