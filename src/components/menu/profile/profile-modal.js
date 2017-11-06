import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Text, Slider, Switch, ActivityIndicator } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
import * as userActions from '../../../store/actions/user';
import * as statsActions from '../../../store/actions/stats';

const styles = require('../../../styles/modals');

function mapStateToProps(state) {
  return {
    showModal: state.user.showModal,
    id: state.user.id,
    username: state.user.username,
    avatarUrl: state.user.avatarUrl,
    stats: state.stats,
    loading: state.user.loading,
    loaded: state.user.loaded,
    error: state.user.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal: userActions.closeModal,
    loadStats: statsActions.loadStats,
  }, dispatch);
};

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.props.loadStats(this.props.username);
    }
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={this.props.closeModal}
      >
        <Grid>
          <Col style={styles.column}>
            {this.props.loading && <Row><ActivityIndicator animating={true} color='steelblue' size='large' /></Row>}
            <Row size={3}>
              <Avatar
                xlarge
                rounded
                source={{uri: this.props.avatarUrl}}
                activeOpacity={0.8}
              />
            </Row>
            <Row><Text style={{ color: 'steelblue', fontSize: 20, fontWeight: 'bold' }}>{this.props.username}</Text></Row>
            <Row><Text>Wins: {this.props.stats.wins}</Text></Row>
            <Row><Text>Losses: {this.props.stats.losses}</Text></Row>
            <Row><Text>Ties: {this.props.stats.ties}</Text></Row>
            <Row><Text>Total Points: {this.props.stats.totalPoints}</Text></Row>
            <Row><Text>Wins by Default: {this.props.stats.winsByDefault}</Text></Row>
            <Row><Text>Games Played: {this.props.stats.gamesPlayed}</Text></Row>
            <Button
              title='BACK'
              onPress={this.props.closeModal}
            />
          </Col>
        </Grid>
      </Modal>
    );
  }
}

ProfileModal.propTypes = {
  showModal: PropTypes.bool,
  id: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  stats: PropTypes.object,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  loadStats: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);