var Players = [
  {
    name: "Alexys Arias",
    score: 30,
    id:1
  },
  {
    name:"Jose Vaca",
    score: 27,
    id:2
  },
  {
    name:"Mariana Espejo",
    score: 28,
    id:3
  },
  {
    name:"Salvador Corona",
    score: 15,
    id:4
  },
  {
    name:"Jaime Humberto",
    score: 22,
    id:5
  },
  {
    name:"Ithzel Beas",
    score: 32,
    id:6
  },
  {
    name:"Lani Cipres",
    score: 19,
    id:7
  }
];

function Header(props){
  return(
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired
}

Header.defaultProps = {
  title: "My Scoreboard"
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div classname="player-score">
        <Counter score={props.score} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
}

function Counter(props){
  return (
    <div className="counter">
      <button className="counter-action decrement"> {props.decrement} </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment"> {props.increment} </button>
    </div>
  );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
}

Counter.defaultProps = {
  decrement: "-",
  increment: "+"
}

function Application(props){
  return (
    <div className="scoreboard">
      <Header/>
      <div className="players">
        {props.players.map(function(player) {
          return <Player name={player.name} score={player.score} key={player.id} />
        })}
      </div>
    </div>
  );
}

Application.propTypes = {
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired
  })).isRequired
}


ReactDOM.render(<Application players={Players}/>, document.getElementById('container'));