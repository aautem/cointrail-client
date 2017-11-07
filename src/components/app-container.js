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

const styles = require('../styles/app');

function mapStateToProps(state) {
  return {
    config: state.app.config,
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
  }
  
  componentWillMount() {
    this.props.loadConfig();
  }

  render() {
    if (this.props.appLoading || this.props.authLoading) {
      return (
        <Grid>
          <Col style={[styles.center, { backgroundColor: 'steelblue' }]}>
            <ActivityIndicator animating={true} color='#fff' size='large' />
          </Col>
        </Grid>
      );
    }

    return (
      <Grid>
        {this.props.page === constants.APP_PAGES.AUTH && <AuthContainer />}
        {this.props.page === constants.APP_PAGES.MENU && <MenuContainer />}
        {this.props.page === constants.APP_PAGES.SERIES && <SeriesContainer />}
      </Grid>
    );
  }
}

AppContainer.propTypes = {
  loadConfig: PropTypes.func,
  config: PropTypes.object,
  page: PropTypes.string,
  authLoading: PropTypes.bool,
  authAuthenticated: PropTypes.bool,
  authError: PropTypes.string,
  appLoading: PropTypes.bool,
  appLoaded: PropTypes.bool,
  appError: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);