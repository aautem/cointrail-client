import Auth0 from 'react-native-auth0';

class AuthUtility {
  constructor() {
    this.auth0Connection = null;
  }

  startAuth0() {
    this.auth0Connection = new Auth0({ domain: 'app77626749.auth0.com', clientId: 'z2xIFUI0P4OLA4S_uJ2CADCe3A2AKsH5' });
  }

  auth0() {
    return this.auth0Connection;
  }
}

const authUtility = new AuthUtility();
export default authUtility;