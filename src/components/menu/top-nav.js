import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../store/actions/settings';
import * as userActions from '../../store/actions/user';
import * as constants from '../../utilities/const';
import { Header } from 'react-native-elements';
import HeaderIcon from './header-icon';

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
  }, dispatch);
};

class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Header
        leftComponent={
          <HeaderIcon
            name='settings'
            type='material-community'
            color='#fff'
            onPress={this.props.openSettingsModal}
          />}
        centerComponent={{
          text: constants.APP_TITLE,
          style: { color: '#fff', fontWeight: 'bold' },
        }}
        rightComponent={
          <HeaderIcon
            name='account-circle'
            type='material-community'
            color='#fff'
            onPress={this.props.openProfileModal}
          />}
        outerContainerStyles={{ backgroundColor: 'steelblue' }}
      />
    );
  }
}

TopNav.propTypes = {
  openSettingsModal: PropTypes.func,
  openProfileModal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);