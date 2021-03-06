import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';

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

class GridTemplate extends React.Component {
  render() {
    return (
      <Grid>
        <Col size={14}>
          <Row size={24}></Row>
        </Col>
      </Grid>
    );
  }
}

GridTemplate.propTypes = {
  //
};

export default connect(mapStateToProps, mapDispatchToProps)(GridTemplate);