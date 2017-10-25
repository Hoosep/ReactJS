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
var nextId = 8;

var Stopwatch = React.createClass({
  getInitialState: function(){
    return{
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  },
  componentDidMount: function() {
    this.interval = setInterval(this.onTick,100);
  },
  componentWillUnmount: function() {
    clearInteval(this.interval);
  },
  onTick: function(){
    if(this.state.running){
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
    console.log('onTick');
  },
  onStart: function(){
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  },
  onStop: function(){
    this.setState({
      running: false
    });
  },
  onReset: function(){
    this.setState({
      elapsedTime:0,
      previousTime: Date.now(),
    });
  },
  render: function(){
    var startStop;
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    if(this.state.running){
      startStop = <button onClick={this.onStop}>Stop</button>;
    } else {
      startStop = <button onClick={this.onStart}>Start</button>;
    }
    var style = {
      display: 'block'
    };
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">
          <div style={style}>{seconds}</div>
          {startStop}
          <button onClick={this.onReset}>Reset</button>
        </div>
      </div>
    );
  }
});

var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },
  getInitialState: function() {
    return {
      name: "",
    };
  },
  onNameChange: function(e){
    this.setState({name: e.target.value});
  },
  onSubmit: function(e) {
    e.preventDefault();

    this.props.onAdd(this.state.name);
    this.setState({name:""});
  },
  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          <input type="submit" value="Add Player"/>
        </form>
      </div>
    );
  }
});

function Stats(props){
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player){
    return total + player.score;
  }, 0);
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  );
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
}
function Header(props){
  return(
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
      <Stopwatch/>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
}

Header.defaultProps = {
  title: "My Scoreboard"
}

function Counter(props){
  return (
    <div className="counter">
      <button className="counter-action decrement" onClick={function() {props.onChange(-1);}} > {props.decrement} </button>
      <div className="counter-score"> {props.score} </div>
      <button className="counter-action increment" onClick={function() {props.onChange(+1);}} > {props.increment} </button>
    </div>
  );  
}

Counter.defaultProps = {
  decrement: "-",
  increment: "+"
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>x</a>
        {props.name}
      </div>
      <div classname="player-score">
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
}

var Application = React.createClass({
  propTypes: {
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },
  getDefaultProps: function(){
  },
  getInitialState: function(){
    return {
      players: this.props.initialPlayers,
    };
  },
  onScoreChange: function(index, delta){
    this.state.players[index].score += delta;
    this.setState(this.state);
  },
  onPlayerAdd: function(name){
    console.log('Player added: ', name);
    this.state.players.push({
      name: name,
      score: 10,
      id: nextId,
    });
    this.setState(this.state);
    nextId += 1;
  },
  onRemovePlayer: function(index){
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },
  render: function() {
    return (
      <div className="scoreboard">
        <Header players={this.state.players}/>
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player
                onScoreChange={function(delta) {this.onScoreChange(index,delta)}.bind(this)}
                onRemove={function(){this.onRemovePlayer(index)}.bind(this)}
                name={player.name} 
                score={player.score}
                key={player.id} />
            );
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
    );    
  }
});


ReactDOM.render(<Application initialPlayers={Players}/>, document.getElementById('container'));