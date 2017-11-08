import Auth0 from 'react-native-auth0';

class AuthUtility {
  constructor() {
    this.auth0Connection = null;
  }

  startAuth0(config) {
    this.auth0Connection = new Auth0({ domain: config.domain, clientId: config.clientId });
  }

  auth0() {
    return this.auth0Connection;
  }
}

const authUtility = new AuthUtility();
export default authUtility;