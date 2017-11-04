import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Text, Slider, Switch } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';
import * as actions from '../../../store/actions/user';

const styles = require('../../../styles/modals');

function mapStateToProps(state) {
  return {
    username: state.user.username,
    showModal: state.user.showModal,
    loading: state.user.loading,
    loaded: state.user.loaded,
    error: state.user.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal: actions.closeModal,
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
            <Text>{this.props.username}</Text>
          </Col>
        </Grid>
      </Modal>
    );
  }
}

ProfileModal.propTypes = {
  username: PropTypes.string,
  showModal: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);