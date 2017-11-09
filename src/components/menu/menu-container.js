import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../store/actions/settings';
import * as userActions from '../../store/actions/user';
import * as appActions from '../../store/actions/app';
import * as seriesActions from '../../store/actions/series';
import * as constants from '../../utilities/const';
import { Text } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Header, Button, Icon } from 'react-native-elements';
import HeaderIcon from './header-icon';
import SettingsModal from './modals/settings';
import ProfileModal from './modals/profile';
import FriendsContainer from './friends/friends-container';
import MenuButton from './menu-button';
import GameRequestModal from './modals/game-request';
const appSS = require('../../styles/app');

function mapStateToProps(state) {
  return {
    user: state.user,
    settings: state.settings,
    seriesLoading: state.series.loading,
    settingsModal: state.settings.showModal,
    profileModal: state.user.showModal,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinGame: seriesActions.joinGame,
    cancelGame: seriesActions.cancelGame,
    openSettingsModal: settingsActions.openModal,
    openProfileModal: userActions.openModal,
    // changePage: appActions.changePage,
    // logout: authActions.logout,
  }, dispatch);
};

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col size={14/14}>

        {/* TOP NAV CONTAINER */}
        <Row size={2/24} style={[{ backgroundColor: '#aaa' }]}>
          <Col size={2/14} style={[appSS.center]}>
            <Icon
              name='settings'
              type='material-community'
              color='#fff'
              onPress={this.props.openSettingsModal}
            />
          </Col>
          <Col size={10/14} style={[appSS.center]}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{constants.APP_TITLE}</Text>
          </Col>
          <Col size={2/14} style={[appSS.center]}>
            <Icon
              name='account-circle'
              type='material-community'
              color='#fff'
              onPress={this.props.openProfileModal}
            />
          </Col>
        </Row>

        {/* FRIENDS CONTAINER */}
        <Row size={8/24} style={[appSS.center, { backgroundColor: '#eee' }]}>
          <FriendsContainer />
        </Row>

        {/* BUTTONS CONTAINER */}
        <Row size={14/24} style={[appSS.center, { backgroundColor: '#fff', paddingTop: 10, paddingBottom: 10 }]}>
          <Col size={2/14}></Col>
          <Col size={10/14}>
            <Row size={3/12}>
              <Col size={10/10} style={appSS.center}>
                <MenuButton
                  icon={{ type: 'font-awesome', name: 'play-circle', color: '#fff' }}
                  title='Join Game'
                  onPress={() => {
                    this.props.joinGame(this.props.user, this.props.settings);
                  }}
                  loading={false}
                />
              </Col>
            </Row>
            <Row size={3/12}>
              <Col size={10/10} style={appSS.center}>
                <MenuButton
                  icon={{ type: 'material-community', name: 'message-text-outline', color: '#fff' }}
                  title='Messages'
                  onPress={() => { console.log('Opening inbox...') }}
                  loading={false}
                />
              </Col>
            </Row>
            <Row size={3/12}>
              <Col size={10/10} style={appSS.center}>
                <MenuButton
                  icon={{ type: 'ionicon', name: 'md-stats', color: '#fff' }}
                  title='Leaderboard'
                  onPress={() => { console.log('Loading leaderboard...') }}
                  loading={false}
                />
              </Col>
            </Row>
            <Row size={3/12}>
              <Col size={10/10} style={appSS.center}>
                <MenuButton
                  icon={{ type: 'material', name: 'help', color: '#fff' }}
                  title='How to Play'
                  onPress={() => { console.log('Loading help...') }}
                  loading={false}
                />
              </Col>
            </Row>
          </Col>
          <Col size={2/14}></Col>
        </Row>

        {/* MODALS */}
        <SettingsModal />
        <ProfileModal />
        <GameRequestModal
          showModal={this.props.seriesLoading}
          cancel={() => { console.log('Cancelling game request...') }}
        />
      </Col>
    );
  }
}

MenuContainer.propTypes = {
  joinGame: PropTypes.func,
  user: PropTypes.object,
  settings: PropTypes.object,
  seriesLoading: PropTypes.bool,
  settingsModal: PropTypes.bool,
  profileModal: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);