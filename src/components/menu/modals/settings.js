import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dimensions, Modal, View, Text, Slider, Switch, ActivityIndicator, TouchableOpacity, TouchableHighlight, Picker } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
import { ColorPicker } from 'react-native-color-picker'
import * as userActions from '../../../store/actions/user';
import { pick } from 'lodash';

const modalSS = require('../../../styles/modals');
const appSS = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    showModal: state.user.showSettingsModal,
    user: state.user,
    settings: state.user.settings,
    loading: state.user.loading,
    loaded: state.user.loaded,
    error: state.user.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveSettings: userActions.saveSettings,
    closeModal: userActions.closeSettingsModal,
  }, dispatch);
};

class SettingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: this.props.settings.boardSize,
      timeLimit: this.props.settings.timeLimit,
      color: this.props.settings.color,
      altColor: this.props.settings.altColor,
      selectingColor: false,
      selectingAltColor: false,
    };
  }

  saveSettings() {
    const settings = pick(this.state, ['boardSize', 'timeLimit', 'color', 'altColor']);
    this.props.saveSettings(this.props.user.auth0Id, settings);
    this.props.closeModal();
  }

  selectColor(color) {
    if (this.state.selectingColor) {
      this.setState({ color: color, selectingColor: false });
    } else if (this.state.selectingAltColor) {
      this.setState({ altColor: color, selectingAltColor: false });
    }
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={this.props.closeModal}
      >
        {!this.state.selectingColor && !this.state.selectingAltColor &&
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#fff' }]}>

          {/* PICTURE / STATS */}
          <Row size={8/24} style={{ backgroundColor: this.state.color }}>
            <Col size={6/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                height={viewportHeight / 5}
                rounded
                source={{uri: this.props.user.avatarUrl}}
                activeOpacity={0.8}
              />
              <Text style={{ textAlign: 'center', paddingTop: 10, color: '#fff', fontWeight: 'bold' }}>
                {this.props.user.username.toUpperCase()}
              </Text>
            </Col>
            <Col size={8/14} style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20, paddingRight: 20 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>GAME</Text>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>PREFERENCES</Text>
            </Col>
          </Row>

          {/* GAME SETTINGS */}
          <Row size={14/24}>
            <Col size={14/14} style={{ justifyContent: 'center', paddingTop: 10, paddingBottom: 30 }}>

              {/* BOARD SIZE */}
              <Row size={4/14}>
                <Col size={14/14} style={{ justifyContent: 'center' }}>
                  <Text style={[{ textAlign: 'center', color: 'black', fontWeight: 'bold' }]}>
                    Gameboard Size: {this.state.boardSize} x {this.state.boardSize}
                  </Text>
                  <Slider
                    minimumValue={4}
                    maximumValue={6}
                    value={this.state.boardSize}
                    step={1}
                    onSlidingComplete={(boardSize) => { this.setState({ boardSize: boardSize }) }}
                    style={{ marginLeft: 30, marginRight: 30 }}
                  />
                </Col>
              </Row>

              {/* TIME LIMIT */}
              <Row size={4/14}>
                <Col size={14/14} style={{ alignItems: 'center', paddingTop: 5 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', paddingBottom: 5 }}>15 Second Limit</Text>
                  <Switch
                    value={this.state.timeLimit}
                    onValueChange={(value) => { this.setState({ timeLimit: value }) }}
                  />
                </Col>
              </Row>

              {/* COLOR SELECTION */}
              <Row size={6/14} style={[appSS.center, { paddingLeft: 25, paddingRight: 25 }]}>
                <Col size={7/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'black', paddingBottom: 10, fontWeight: 'bold' }}>Coin Color</Text>
                  <TouchableOpacity onPress={() => {
                    this.setState({ selectingColor: true });
                  }}>
                    <View style={{
                      height: viewportHeight / 6,
                      width: viewportHeight / 6,
                      backgroundColor: this.state.color,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: 'black',
                      borderStyle: 'solid',
                  }} />
                  </TouchableOpacity>
                </Col>
                <Col size={7/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'black', paddingBottom: 10, fontWeight: 'bold' }}>Alternate Color</Text>
                  <TouchableOpacity onPress={() => {
                    this.setState({ selectingAltColor: true });
                  }}>
                    <View style={{
                      height: viewportHeight / 6,
                      width: viewportHeight / 6,
                      backgroundColor: this.state.altColor,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: 'black',
                      borderStyle: 'solid',
                    }}/>
                  </TouchableOpacity>
                </Col>
              </Row>
            
            </Col>
          </Row>

          {/* SAVE BUTTON (TODO: ADD CANCEL BUTTON) */}
          <Row size={2/24}>
            <TouchableHighlight
              style={{ alignItems: 'center', flex: 1, backgroundColor: '#eee' }}
              underlayColor='#ddd'
              activeOpacity={0.9}
              onPress={this.saveSettings.bind(this)}
            >
              <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.props.loading &&
                <ActivityIndicator animating={true} color='#aaa' size='small' />}
                <Text style={{ color: '#aaa', fontWeight: 'bold' }}>Save</Text>
              </Row>
            </TouchableHighlight>
          </Row>

        </Col>}

        {/* COLOR PICKER */}
        {(this.state.selectingColor || this.state.selectingAltColor) &&
        <Col size={14/14} style={{ backgroundColor: '#fff' }}>
          <Row size={22/24} style={{ paddingLeft: 50, paddingRight: 50 }}>
            <ColorPicker
              onColorSelected={this.selectColor.bind(this)}
              style={{ flex: 1 }}
              hideSliders={true}
              defaultColor={this.state.selectingAltColor ? this.state.altColor : this.state.color}
            />
          </Row>
          <Row size={2/24}>
            <TouchableHighlight
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }}
              underlayColor='#ddd'
              activeOpacity={0.9}
              onPress={() => { this.setState({ selectingColor: false, selectingAltColor: false }) }}>
              <Text style={{ color: '#aaa' }}>Cancel</Text>
            </TouchableHighlight>
          </Row>
        </Col>}
      </Modal>
    );
  }
}

SettingsModal.propTypes = {
  user: PropTypes.object,
  settings: PropTypes.object,
  showModal: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  saveSettings: PropTypes.func,
  closeModal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);