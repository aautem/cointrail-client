import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../store/actions/settings';
import * as userActions from '../../store/actions/user';
import * as appActions from '../../store/actions/app';
import * as gameActions from '../../store/actions/game';
import * as constants from '../../utilities/const';
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';
import { Text, View, Dimensions } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Header, Button, Icon } from 'react-native-elements';
import CointrailIcon from '../common/cointrail_icon';
import HeaderIcon from './header-icon';
import SettingsModal from './modals/settings';
import ProfileModal from './modals/profile';
import FriendsContainer from './friends/friends-container';
import MenuButton from './menu-button';
import GameRequestModal from './modals/game-request';
import FriendComponent from './friends/friend';

const appSS = require('../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    user: state.user,
    showRequestModal: state.game.showRequestModal,
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
  }, dispatch);
};

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [
        {username: 'aautem', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583, color: 'green'},
        {username: 'cdturner', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583, color: 'purple'},
        {username: 'kaitheguy', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583, color: 'red'},
        {username: 'billybob', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583, color: 'powderblue'},
        {username: 'chocolaterain', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583, color: 'grey'},
        {username: 'timmytwoshoes', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583, color: 'pink'},
        {username: 'kipperdom', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583, color: 'steelblue'},
        {username: 'hazyhank', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583, color: 'lime'},
      ],
    };
  }

  renderItem ({item, index}) {
    return (
      <FriendComponent username={item.username} image={item.avatar} text={item.points} color={item.color} />
    );
  }

  render() {
    return (
      <Col size={14/14}>

        {/* FRIENDS CONTAINER */}
        <Row size={10/24} style={[appSS.center, { backgroundColor: '#eee' }]}>
          <Col size={14/14}>
            <Row size={2/10}>
              <Col size={4/14} style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ color: '#aaa', fontWeight: 'bold', paddingLeft: 10 }}>
                  3/12
                </Text>
                <Text style={{ color: '#aaa', fontWeight: 'bold', paddingLeft: 10 }}>
                  Friends Online
                </Text>
              </Col>
              <Col size={10/14}>
                <Row size={2/2} style={{ justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10, backgroundColor: '#ddd', borderBottomLeftRadius: 50, borderColor: '#aaa', borderWidth: 2, borderTopWidth: 0, borderRightWidth: 0 }}>
                  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20, paddingRight: 10 }}>{this.props.user.username}</Text>
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

            <Row size={8/10} style={{ paddingBottom: 5 }}>
              <Carousel
                ref={(c) => { this._carousel = c }}
                data={this.state.friends}
                renderItem={this.renderItem}
                sliderWidth={viewportWidth}
                itemWidth={150}
                activeSlideAlignment='start'
                inactiveSlideOpacity={0.60}
                inactiveSlideScale={0.80}
                inactiveSlideShift={0}
              />
            </Row>
          </Col>
        </Row>

        <Row size={14/24}>
          <Col size={8/14}>

            <Row size={14/14}>
              <Col size={8/8} style={{ backgroundColor: '#fff' }}>

                {/* COINTRAIL ICON */}
                <Row size={12/14} style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingTop: 20 }}>
                  <CointrailIcon />
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
                  onPress={() => { alert('Messages') }}
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