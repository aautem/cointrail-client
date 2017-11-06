import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Text, ActivityIndicator } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
const _appSS = require('../../../styles/app');

function mapStateToProps(state) {
  return {
    //
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class GameRequestModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.showModal}
      >
        <Grid>
          <Col style={[_appSS.center, { paddingTop: 20, paddingBottom: 20 }]}>
            <ActivityIndicator
              animating={this.props.showModal}
              size='large'
              color='steelblue'
            />
            <Text>Finding Opponent...</Text>
          </Col>
        </Grid>
      </Modal>
    );
  }
}

GameRequestModal.propTypes = {
  //
};

export default connect(mapStateToProps, mapDispatchToProps)(GameRequestModal);