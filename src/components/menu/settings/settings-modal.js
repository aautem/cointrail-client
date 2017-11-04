import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, Slider, Switch } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';
import * as actions from '../../../store/actions/settings';

const styles = require('../../../styles/modals');

function mapStateToProps(state) {
  return {
    showModal: state.settings.showModal,
    size: state.settings.size,
    length: state.settings.length,
    timer: state.settings.timer,
    loading: state.settings.loading,
    loaded: state.settings.loaded,
    error: state.settings.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal: actions.closeModal,
    changeSize: actions.changeSize,
    changeLength: actions.changeLength,
    toggleTimer: actions.toggleTimer,
  }, dispatch);
};

class SettingsModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.showModal}
        onRequestClose={this.props.closeModal}
      >
        <Grid>
          <Col size={1} style={styles.transparent}></Col>
          <Col size={4}>
            <Row size={1} style={styles.transparent}></Row>
            <Row size={3} style={{ backgroundColor: '#fff' }}>
              <Col style={styles.column}>
                <Row>
                  <Text>Default Settings</Text>
                </Row>
                <Row>
                  <Col style={styles.column}>
                    <Row>
                      <Text>Board Size: {this.props.size}</Text>
                    </Row>
                    <Row>
                      <Slider
                        minimumValue={4}
                        maximumValue={6}
                        value={this.props.size}
                        step={1}
                        onSlidingComplete={(size) => { this.props.changeSize(size) }}
                        style={styles.fullWidth}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.column}>
                    <Row>
                      <Text>Series Length: {this.props.length}</Text>
                    </Row>
                    <Row>
                      <Slider
                        minimumValue={3}
                        maximumValue={11}
                        value={this.props.length}
                        step={4}
                        onSlidingComplete={(length) => { this.props.changeLength(length) }}
                        style={styles.fullWidth}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.column}>
                    <Row>
                      <Text>Timer: {this.props.timer ? 'On' : 'Off'}</Text>
                    </Row>
                    <Row>
                      <Switch
                        value={this.props.timer}
                        onValueChange={() => { this.props.toggleTimer() }}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.column}>
                  <Button
                    title='Save'
                    backgroundColor='steelblue'
                    onPress={() => { console.log('Saving settings...') }}
                  />
                  </Col>
                  <Col style={styles.column}>
                    <Button
                      title='Cancel'
                      backgroundColor='steelblue'
                      onPress={this.props.closeModal}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row size={1} style={styles.transparent}></Row>
          </Col>
          <Col size={1} style={styles.transparent}></Col>
        </Grid>
      </Modal>
    );
  }
}

SettingsModal.propTypes = {
  showModal: PropTypes.bool,
  size: PropTypes.number,
  length: PropTypes.number,
  timer: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  changeSize: PropTypes.func,
  changeLength: PropTypes.func,
  toggleTimer: PropTypes.func,
  closeModal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);