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
import { Header, Button } from 'react-native-elements';
import TopNav from './top-nav';
import HeaderIcon from './header-icon';
import SettingsModal from './modals/settings';
import ProfileModal from './modals/profile';
import FriendsContainer from './friends/friends-container';
import MenuButton from './menu-button';
import GameRequestModal from './modals/game-request';
const _appSS = require('../../styles/app');

function mapStateToProps(state) {
  return {
    user: state.user,
    settings: state.settings,
    seriesLoading: state.series.loading,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinGame: seriesActions.joinGame,
    // changePage: appActions.changePage,
    // logout: authActions.logout,
  }, dispatch);
};

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  joinGame() {
    this.props.joinGame(this.props.user, this.props.settings);
  }

  render() {
    return (
      <Col size={14} style={{ backgroundColor: 'lightgrey' }}>
        <Row size={2}>
          <TopNav />
        </Row>
        <Row size={0.5}>
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>Friends</Text>
        </Row>
        <Row size={4} style={{ backgroundColor: 'lightgrey', paddingBottom: 20 }}>
          <FriendsContainer />
        </Row>
        <Row size={8} style={{ paddingTop: 10, backgroundColor: 'steelblue' }}>
          <Col size={2}></Col>
          <Col size={10}>
            <Row size={4} style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
              <MenuButton
                icon={{ type: 'font-awesome', name: 'play-circle', color: 'steelblue' }}
                title='Join Game'
                onPress={this.joinGame.bind(this)}
                loading={false}
              />
            </Row>
            <Row size={4} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <MenuButton
                icon={{ type: 'material-community', name: 'message-text-outline', color: 'steelblue' }}
                title='Messages'
                onPress={() => { console.log('Opening inbox...') }}
                loading={false}
              />
            </Row>
            <Row size={4} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <MenuButton
                icon={{ type: 'ionicon', name: 'md-stats', color: 'steelblue' }}
                title='Leaderboard'
                onPress={() => { console.log('Loading leaderboard...') }}
                loading={false}
              />
            </Row>
            <Row size={4} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <MenuButton
                icon={{ type: 'material', name: 'help', color: 'steelblue' }}
                title='How to Play'
                onPress={() => { console.log('Loading help...') }}
                loading={false}
              />
            </Row>
          </Col>
          <Col size={2}></Col>
        </Row>
        <Row size={2} style={{ backgroundColor: 'steelblue' }}></Row>
        <SettingsModal />
        <ProfileModal />
        <GameRequestModal
          showModal={this.props.seriesLoading}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);