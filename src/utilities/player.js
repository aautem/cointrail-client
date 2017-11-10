// id: null,
// username: null,
// color: null,
// avatarUrl: null,
// points: 0
// winner: false,
// wins: 0,
// losses: 0,
// draws: 0,

export class GamePlayer {
  constructor(props) {
    this.id = props.id;
    this.username = props.username;
    this.avatarUrl = props.avatarUrl;
    this.color = props.color;
    this.points = 0;
    this.winner = false;
  }

  redeemPoints(points) {
    this.points += points;
  }
}

export class SeriesPlayer extends GamePlayer {
  constructor(props) {
    super(props);
    this.wins = 0;
    this.losses = 0;
    this.draws = 0;
  }
}