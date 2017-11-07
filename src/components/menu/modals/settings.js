import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../../store/actions/settings';
import { Modal, Text, Slider, Switch, ActivityIndicator } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';

const styles = require('../../../styles/modals');
const _appSS = require('../../../styles/app');

function mapStateToProps(state) {
  return {
    showModal: state.settings.showModal,
    username: state.user.username,
    boardSize: state.settings.boardSize,
    seriesLength: state.settings.seriesLength,
    timeLimit: state.settings.timeLimit,
    loading: state.settings.loading,
    loaded: state.settings.loaded,
    error: state.settings.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal: settingsActions.closeModal,
    loadSettings: settingsActions.loadSettings,
    updateSettings: settingsActions.updateSettings,
    changeSize: settingsActions.changeSize,
    changeLength: settingsActions.changeLength,
    toggleTimer: settingsActions.toggleTimer,
  }, dispatch);
};

class SettingsModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal && !nextProps.loaded) {
      this.props.loadSettings(this.props.username);
    }
  }

  saveSettings() {
    const settings = {
      boardSize: this.props.boardSize,
      seriesLength: this.props.seriesLength,
      timeLimit: this.props.timeLimit,
    }
    this.props.updateSettings(this.props.username, settings);
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.showModal}
        onRequestClose={this.props.closeModal}
      >
        <Grid style={[_appSS.center, { backgroundColor: '#fff', paddingTop: 35, paddingBottom: 35 }]}>
          {this.props.loading &&
          <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator animating={true} color='steelblue' size='large' />
          </Col>}

          {!this.props.loading &&
          <Col>
            <Row size={3} style={{ backgroundColor: '#fff' }}>
              <Col style={styles.column}>
                <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'steelblue', fontWeight: 'bold' }}>User Preferences</Text>
                </Row>
                <Row>
                  <Col style={styles.column}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text>{this.props.boardSize} x {this.props.boardSize} Board</Text>
                    </Row>
                    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Col></Col>
                      <Col size={3}>
                        <Slider
                          minimumValue={4}
                          maximumValue={6}
                          value={this.props.boardSize}
                          step={1}
                          onSlidingComplete={(boardSize) => { this.props.changeSize(boardSize) }}
                          style={styles.fullWidth}
                        />
                      </Col>
                      <Col></Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.column}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text>{this.props.seriesLength} Game Series</Text>
                    </Row>
                    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Col></Col>
                      <Col size={3}>
                        <Slider
                          minimumValue={3}
                          maximumValue={11}
                          value={this.props.seriesLength}
                          step={4}
                          onSlidingComplete={(seriesLength) => { this.props.changeLength(seriesLength) }}
                          style={styles.fullWidth}
                        />
                      </Col>
                      <Col></Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.column}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ paddingRight: 10 }}>Time Limit</Text>
                      <Switch
                        value={this.props.timeLimit}
                        onValueChange={() => { this.props.toggleTimer() }}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    title='Save'
                    backgroundColor='steelblue'
                    onPress={this.saveSettings.bind(this)}
                    buttonStyle={{ width: '100%' }}
                    borderRadius={5}
                    containerViewStyle={{ borderRadius: 5 }}
                  />
                </Row>
              </Col>
            </Row>
          </Col>}
        </Grid>
      </Modal>
    );
  }
}

SettingsModal.propTypes = {
  showModal: PropTypes.bool,
  username: PropTypes.string,
  boardSize: PropTypes.number,
  seriesLength: PropTypes.number,
  timeLimit: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  changeSize: PropTypes.func,
  changeLength: PropTypes.func,
  toggleTimer: PropTypes.func,
  closeModal: PropTypes.func,
  loadSettings: PropTypes.func,
  updateSettings: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);