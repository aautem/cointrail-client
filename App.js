import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/configure-store';
import AppContainer from './src/components/app-container';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}