import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { getUser } from '../store/actions/auth';
import { Text } from 'react-native';
// Auth Component
import MenuContainer from './menu/menu-container';
import GameContainer from './game/game-container';
import { pages } from '../utilities/const';

const styles = require('../styles/containers');

function mapStateToProps(state) {
  return {
    page: state.app.page,
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

    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Grid>
        <Col>
          {this.props.page === pages.AUTH && null}
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