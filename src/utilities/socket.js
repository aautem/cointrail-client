import io from 'socket.io-client';
import { API_URL } from './const';

class SocketUtility {
  constructor() {
    this.socket = null;
  }

  createSocketConnection() {
    this.socket = io(API_URL);
  }
}

const socketUtility = new SocketUtility();
export default socketUtility;