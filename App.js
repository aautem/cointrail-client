import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/configure-store';
import AppContainer from './src/components/app-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    // Load any config data from API
  }

  componentWillUnmount() {
    // Remove any stored account data?
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}