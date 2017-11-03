import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { getUser } from '../store/actions/auth';
import styles from '../styles/styles';
import { Text } from 'react-native';
// Auth Component
// Menu Component
// Game Component

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
    stats: state.stats,
    series: state.series,
    game: state.game,
    opponent: state.opponent,
    leaderboard: state.leaderboard,
    messages: state.messages,
    friends: state.friends,
    history: state.history,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: getUser,
  }, dispatch);
};

AppContainer.propTypes = {
  auth: PropTypes.object,
  user: PropTypes.object,
  stats: PropTypes.object,
  series: PropTypes.object,
  game: PropTypes.object,
  opponent: PropTypes.object,
  leaderboard: PropTypes.object,
  messages: PropTypes.object,
  friends: PropTypes.object,
  history: PropTypes.object,
};

class AppContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    console.log('*** APP PROPS ***', this.props);
  }

  componentWillUnmount() {}

  render() {
    return (
      <Grid>
        <Col style={styles.appContainer}>

          {/* Components go here! */}
          <Text>Hello World!</Text>

        </Col>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);