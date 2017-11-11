import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as appActions from '../store/actions/app';
import * as constants from '../utilities/const';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { ActivityIndicator } from 'react-native';
import AuthContainer from './auth/auth-container';
import MenuContainer from './menu/menu-container';
import SeriesContainer from './series/series-container';
import SoloGameContainer from './game/solo-game';
import TestContainer from './common/test-container';

const appSS = require('../styles/app');

function mapStateToProps(state) {
  return {
    page: state.app.page,
    authLoading: state.auth.loading,
    authAuthenticated: state.auth.authenticated,
    authError: state.app.error,
    appLoading: state.app.loading,
    appLoaded: state.app.loaded,
    appError: state.app.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadConfig: appActions.loadConfig,
  }, dispatch);
};

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadConfig();
  }

  render() {
    if (this.props.appLoading || this.props.authLoading) {
      return (
        <Grid>
          <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
            <ActivityIndicator animating={true} color='#fff' size='large' />
          </Col>
        </Grid>
      );
    }

    return (
      <Grid>
        <Col size={14/14}>

          {/* APP PAGES */}
          <Row size={24/24}>
            {this.props.page === constants.APP_PAGES.AUTH && <AuthContainer />}
            {this.props.page === constants.APP_PAGES.MENU && <MenuContainer />}
            {this.props.page === constants.APP_PAGES.SERIES && <SeriesContainer />}
            {this.props.page === constants.APP_PAGES.SOLO && <SoloGameContainer />}

            {this.props.page === 'test' && <TestContainer />}
          </Row>

        </Col>
      </Grid>
    );
  }
}

AppContainer.propTypes = {
  loadConfig: PropTypes.func,
  page: PropTypes.oneOf(['auth', 'menu', 'series', 'game', 'solo', 'test']),
  authLoading: PropTypes.bool,
  authAuthenticated: PropTypes.bool,
  authError: PropTypes.string,
  appLoading: PropTypes.bool,
  appLoaded: PropTypes.bool,
  appError: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);