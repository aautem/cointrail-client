import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button } from 'react-native-elements';
import HeaderIcon from './header/header-icon';
import SettingsModal from './settings/settings-modal';
import FriendsContainer from './friends/friends-container';

const styles = require('../../styles/containers');

function mapStateToProps(state) {
  return {
    //
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {
        showModal: false,
        size: 4,
        length: 7,
        timer: false,
      },
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  changeSize(size) {
    this.setState((prevState) => {
      const settings = Object.assign({}, prevState.settings, {size: size});
      return {settings: settings};
    });
  }

  changeLength(length) {
    this.setState((prevState) => {
      const settings = Object.assign({}, prevState.settings, {length: length});
      return {settings: settings};
    });
  }

  toggleTimer(value) {
    this.setState((prevState) => {
      const settings = Object.assign({}, prevState.settings, {timer: value});
      return {settings: settings};
    });
  }

  openSettings() {
    this.setState((prevState) => {
      const settings = Object.assign({}, prevState.settings, {showModal: true});
      return {settings: settings};
    });
  }

  closeSettings() {
    this.setState((prevState) => {
      const settings = Object.assign({}, prevState.settings, {showModal: false});
      return {settings: settings};
    });
  }

  render() {
    return (
      <Grid>
        <Col style={styles.menuContainer}>
          <Row size={1.5}>
            <Header
              leftComponent={<HeaderIcon name='settings' type='material-community' color='#fff' onPress={this.openSettings.bind(this)} />}
              centerComponent={{ text: '.~::  C O N T R A I L  ::~.', style: { color: '#fff' } }}
              rightComponent={<HeaderIcon name='account-circle' type='material-community' color='#fff' onPress={() => { console.log('Loading profile...') }} />}
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
              onPress={() => { console.log('Finding oppenent...') }}
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
              onPress={() => { console.log('Loading FAQ...') }}
              loading={false}
              buttonStyle={{ width: '100%' }}
            />
          </Row>
          <SettingsModal
            settings={this.state.settings}
            changeSize={this.changeSize.bind(this)}
            changeLength={this.changeLength.bind(this)}
            toggleTimer={this.toggleTimer.bind(this)}
            closeModal={this.closeSettings.bind(this)}
          />
        </Col>
      </Grid>
    );
  }
}

// MenuContainer.propTypes = {
//   //
// };

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);