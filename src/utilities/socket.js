import io from 'socket.io-client';
import { API_URL } from './const';

class SocketUtility {
  constructor() {
    this.socketConnection = null;
  }

  createSocketConnection() {
    this.socketConnection = io(API_URL);
  }

  socket() {
    return this.socketConnection;
  }
}

const socketUtility = new SocketUtility();
export default socketUtility;