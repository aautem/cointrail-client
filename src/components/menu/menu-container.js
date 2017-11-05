import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../store/actions/settings';
import * as userActions from '../../store/actions/user';
import * as appActions from '../../store/actions/app';
import * as constants from '../../utilities/const';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Header, Button } from 'react-native-elements';
import HeaderIcon from './header/header-icon';
import SettingsModal from './settings/settings-modal';
import ProfileModal from './profile/profile-modal';
import FriendsContainer from './friends/friends-container';

const styles = require('../../styles/app');

function mapStateToProps(state) {
  return {
    //
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openSettingsModal: settingsActions.openModal,
    openProfileModal: userActions.openModal,
    openMessagesModal: null,
    openHelpModal: null,
    changePage: appActions.changePage,
  }, dispatch);
};

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Grid>
        <Col style={{ backgroundColor: '#fff' }}>
          <Row size={1.5}>
            <Header
              leftComponent={<HeaderIcon name='settings' type='material-community' color='#fff' onPress={this.props.openSettingsModal} />}
              centerComponent={{ text: constants.APP_TITLE, style: { color: '#fff', fontWeight: 'bold' } }}
              rightComponent={<HeaderIcon name='account-circle' type='material-community' color='#fff' onPress={this.props.openProfileModal} />}
              outerContainerStyles={{ backgroundColor: 'steelblue' }}
            />
          </Row>
          <Row size={3} style={{ backgroundColor: 'skyblue' }}>
            <FriendsContainer />
          </Row>
          <Row size={2} style={{ backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              large
              raised
              icon={{ type: 'font-awesome', name: 'play-circle' }}
              title='PLAY NOW'
              backgroundColor='steelblue'
              onPress={() => { this.props.changePage(constants.APP_PAGES.GAME) }}
              loading={false}
              buttonStyle={{ width: '100%' }}
            />
          </Row>
          <Row size={2} style={{ backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              large
              raised
              icon={{ type: 'material-community', name: 'message-text-outline' }}
              title='MESSAGES'
              backgroundColor='steelblue'
              onPress={() => { console.log('Opening inbox...') }}
              loading={false}
              buttonStyle={{ width: '100%' }}
            />
          </Row>
          <Row size={2} style={{ backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              large
              raised
              icon={{ type: 'ionicon', name: 'md-stats' }}
              title='LEADERBOARD'
              backgroundColor='steelblue'
              onPress={() => { console.log('Loading leaderboard...') }}
              loading={false}
              buttonStyle={{ width: '100%' }}
            />
          </Row>
          <Row size={2} style={{ backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              large
              raised
              icon={{ type: 'material', name: 'help' }}
              title='HOW TO PLAY'
              backgroundColor='steelblue'
              onPress={() => { console.log('Loading help...') }}
              loading={false}
              buttonStyle={{ width: '100%' }}
            />
          </Row>
          <SettingsModal />
          <ProfileModal />
        </Col>
      </Grid>
    );
  }
}

MenuContainer.propTypes = {
  openSettingsModal: PropTypes.func,
  openProfileModal: PropTypes.func,
  openMessagesModal: PropTypes.func,
  openHelpModal: PropTypes.func,
  changePage: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);