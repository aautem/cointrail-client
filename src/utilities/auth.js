import Auth0 from 'react-native-auth0';

class AuthUtility {
  constructor() {
    this.auth0 = null;
  }

  startAuth0(config) {
    this.auth0 = new Auth0({ domain: config.domain, clientId: config.clientId });
  }
}

const authUtility = new AuthUtility();
export default authUtility;