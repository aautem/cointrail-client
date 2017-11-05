import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Text, Slider, Switch } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
import * as userActions from '../../../store/actions/user';

const styles = require('../../../styles/modals');

function mapStateToProps(state) {
  return {
    id: state.user.id,
    username: state.user.username,
    avatar: state.user.avatar,
    stats: state.user.stats,
    showModal: state.user.showModal,
    loading: state.user.loading,
    loaded: state.user.loaded,
    error: state.user.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal: userActions.closeModal,
    loadStats: userActions.loadStats,
  }, dispatch);
};

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
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
            <Avatar
              xlarge
              rounded
              source={{uri: this.props.avatar}}
              activeOpacity={0.8}
            />
            <Text style={{ color: 'steelblue', fontSize: 20, fontWeight: 'bold' }}>{this.props.username}</Text>
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
  id: PropTypes.string,
  username: PropTypes.string,
  avatar: PropTypes.string,
  stats: PropTypes.object,
  showModal: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  loadStats: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);