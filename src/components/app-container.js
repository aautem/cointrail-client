import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as appActions from '../store/actions/app';
import * as constants from '../utilities/const';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { ActivityIndicator, Text } from 'react-native';
import AuthContainer from './auth/auth-container';
import MenuContainer from './menu/menu-container';
import SeriesContainer from './series/series-container';
import SoloGameContainer from './game/solo-game';
import TestContainer from './common/test-container';

const appSS = require('../styles/app');

function mapStateToProps(state) {
  return {
    page: state.app.page,
    loading: state.app.loading,
    loaded: state.app.loaded,
    error: state.app.error,
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
    if (this.props.loading) {
      return (
        <Grid>
          <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
            <ActivityIndicator animating={true} color='#fff' size='large' />
            <Text style={{ color: '#fff' }}>Loading</Text>
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

            {this.props.page === constants.APP_PAGES.TEST && <TestContainer />}
          </Row>

        </Col>
      </Grid>
    );
  }
}

AppContainer.propTypes = {
  page: PropTypes.oneOf(['auth', 'menu', 'series', 'game', 'solo', 'test']),
  loadConfig: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);