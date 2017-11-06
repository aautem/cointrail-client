import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../store/actions/settings';
import * as userActions from '../../store/actions/user';
import * as appActions from '../../store/actions/app';
import * as seriesActions from '../../store/actions/series';
import * as constants from '../../utilities/const';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Header, Button } from 'react-native-elements';
import TopNav from './top-nav';
import HeaderIcon from './header-icon';
import SettingsModal from './settings/settings-modal';
import ProfileModal from './profile/profile-modal';
import FriendsContainer from './friends/friends-container';
import MenuButton from './menu-button';

const styles = require('../../styles/app');

function mapStateToProps(state) {
  return {
    //
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changePage: appActions.changePage,
    joinGame: seriesActions.joinGame,
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
        <Col style={{ backgroundColor: 'skyblue' }}>
          <Row size={1.5}>
            <TopNav />
          </Row>
          <Row size={3}>
            <FriendsContainer />
          </Row>
          <Row size={2} style={styles.center}>
            <MenuButton
              icon={{ type: 'font-awesome', name: 'play-circle' }}
              title='PLAY NOW'
              onPress={this.props.joinGame}
              loading={false}
            />
          </Row>
          <Row size={2} style={styles.center}>
            <MenuButton
              icon={{ type: 'material-community', name: 'message-text-outline' }}
              title='MESSAGES'
              onPress={() => { console.log('Opening inbox...') }}
              loading={false}
            />
          </Row>
          <Row size={2} style={styles.center}>
            <MenuButton
              icon={{ type: 'ionicon', name: 'md-stats' }}
              title='LEADERBOARD'
              onPress={() => { console.log('Loading leaderboard...') }}
              loading={false}
            />
          </Row>
          <Row size={2} style={styles.center}>
            <MenuButton
              icon={{ type: 'material', name: 'help' }}
              title='HOW TO PLAY'
              onPress={() => { console.log('Loading help...') }}
              loading={false}
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
  changePage: PropTypes.func,
  joinGame: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);