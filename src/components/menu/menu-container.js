import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button } from 'react-native-elements';
import HeaderIcon from './header/header-icon';

const styles = require('../../styles/containers');

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

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Grid>
        <Col style={styles.menuContainer}>
          <Row size={1.5}>
            <Header
              leftComponent={<HeaderIcon name='settings' type='material-community' color='#fff' onPress={() => { console.log('Opening settings...') }} />}
              centerComponent={{ text: '.~::  C O N T R A I L  ::~.', style: { color: '#fff' } }}
              rightComponent={<HeaderIcon name='account-circle' type='material-community' color='#fff' onPress={() => { console.log('Loading profile...') }} />}
              outerContainerStyles={{ backgroundColor: 'steelblue' }}
            />
          </Row>
          <Row size={3} style={{ backgroundColor: 'skyblue' }}>
            <Text style={{ color: 'steelblue' }}>FRIENDS</Text>
          </Row>
          <Row size={2} style={{ backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              large
              raised
              icon={{ type: 'font-awesome', name: 'play-circle' }}
              title='PLAY NOW'
              backgroundColor='steelblue'
              onPress={() => { console.log('Finding oppenent...') }}
              loading={false}
              buttonStyle={{ width: '100%' }}
            />
          </Row>
          <Row size={2} style={{ backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              large
              raised
              icon={{ type: 'material-community', name: 'message-text-outline' }}
              title='MESSAGES'
              backgroundColor='steelblue'
              onPress={() => { console.log('Opening inbox...') }}
              loading={false}
              buttonStyle={{ width: '100%' }}
            />
          </Row>
          <Row size={2} style={{ backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              large
              raised
              icon={{ type: 'ionicon', name: 'md-stats' }}
              title='LEADERBOARD'
              backgroundColor='steelblue'
              onPress={() => { console.log('Loading leaderboard...') }}
              loading={false}
              buttonStyle={{ width: '100%' }}
            />
          </Row>
          <Row size={2} style={{ backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              large
              raised
              icon={{ type: 'material', name: 'help' }}
              title='HOW TO PLAY'
              backgroundColor='steelblue'
              onPress={() => { console.log('Loading FAQ...') }}
              loading={false}
              buttonStyle={{ width: '100%' }}
            />
          </Row>
        </Col>
      </Grid>
    );
  }
}

// MenuContainer.propTypes = {
//   //
// };

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);