// id: null,
// username: null,
// color: null,
// avatarUrl: null,
// points: 0
// winner: false,
// wins: 0,
// losses: 0,
// draws: 0,
// disconnected: false,

export class GamePlayer {
  constructor(props) {
    this.id = props.id;
    this.username = props.username;
    this.avatarUrl = props.avatarUrl;
    this.color = props.color;
    this.points = 0;
    this.winner = false;
  }
}