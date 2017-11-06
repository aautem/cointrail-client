import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Modal, Text, Slider, Switch, ActivityIndicator } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
import * as userActions from '../../../store/actions/user';
import * as statsActions from '../../../store/actions/stats';

const styles = require('../../../styles/modals');
const _appSS = require('../../../styles/app');

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
          <Col style={[_appSS.center, { paddingTop: 50, paddingBottom: 50 }]}>
            {this.props.loading &&
            <ActivityIndicator animating={true} color='steelblue' size='large' />}

            {/* activity indicator OR player stats */}

            {!this.props.loading &&
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Avatar
                xlarge
                rounded
                source={{uri: this.props.avatarUrl}}
                activeOpacity={0.8}
              />
              <Text style={{ color: 'steelblue', fontSize: 20, fontWeight: 'bold', flex: 1, flexDirection: 'row' }}>
                {this.props.username}
              </Text>
              <Text style={{ flex: 1, flexDirection: 'row' }}>Wins: {this.props.stats.wins}</Text>
              <Text style={{ flex: 1, flexDirection: 'row' }}>Losses: {this.props.stats.losses}</Text>
              <Text style={{ flex: 1, flexDirection: 'row' }}>Draws: {this.props.stats.draws}</Text>
              <Text style={{ flex: 1, flexDirection: 'row' }}>Total Points: {this.props.stats.totalPoints}</Text>
              <Text style={{ flex: 1, flexDirection: 'row' }}>Wins by Default: {this.props.stats.winsByDefault}</Text>
              <Text style={{ flex: 1, flexDirection: 'row' }}>Games Played: {this.props.stats.gamesPlayed}</Text>
              <Button
                title='BACK'
                onPress={this.props.closeModal}
                backgroundColor='steelblue'
                color='#fff'
              />
            </View>}
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