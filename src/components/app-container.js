import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { getUser } from '../store/actions/auth';
import { Text } from 'react-native';
import io from 'socket.io-client';
import AuthContainer from './auth/auth-container';
import MenuContainer from './menu/menu-container';
import GameContainer from './game/game-container';
import { pages } from '../utilities/const';

const styles = require('../styles/containers');

function mapStateToProps(state) {
  return {
    page: state.app.page,
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: getUser,
  }, dispatch);
};

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentWillMount() {
    // open Socket.IO connection on AUTHENTICATION / LOGIN
    // this.socket = io('https://contrail-api.herokuapp.com/');
    // this.socket.on('user-request', (socketId, userOnline) => {
    //   const user = Object.assign({}, this.props.user, { id: socketId });
    //   userOnline(user);
    // });
  }

  componentWillUnmount() {}

  render() {
    return (
      <Grid>
        <Col>
          {this.props.page === pages.AUTH && <AuthContainer />}
          {this.props.page === pages.MENU && <MenuContainer />}
          {this.props.page === pages.GAME && <GameContainer />}
        </Col>
      </Grid>
    );
  }
}

AppContainer.propTypes = {
  page: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);