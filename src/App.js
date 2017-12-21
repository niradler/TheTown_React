import React, {Component} from 'react';
import {Tab, TabBar} from 'rmwc';
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarMenuIcon,
  ToolbarTitle,
  ToolbarIcon
} from 'rmwc';
import Create from './screens/Create';
import Play from './screens/Play';
import Join from './screens/Join';
import server from "./server";
import store from "./store";
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      activeTabIndex: 0,
      game_data:{
      players: '',
      assassins: '',
      assassins_indexes: [],
      detective: '',
      detective_indexes: [],
      players_map: [],
      players_join: [],
      game_id:"",
      c_player:{}
      }
    };
    this.sync = this
    .sync
    .bind(this);
    this.createGame = this
      .createGame
      .bind(this);
      this.joinGame = this
      .joinGame
      .bind(this);
     this.updateGameData=this.updateGameData.bind(this);
  }
  componentWillMount(){
    this.setState({userId:store.getId()})
  }
  sync(state){
this.setState({...state})
  }
  updateGameData(game){
    console.log('updateGameData',game)
    const state = this.state;
    state.game_data = {...game};
    state.activeTabIndex=2;
    this.setState(state,()=>{

    })
   }
  createGame(state) {
store.set(state);
    this.setState({
      game_data:{...state}
    },()=>{
     const game_id =  server.createGame(this.state.game_data)
     server.joinGame(game_id,this.updateGameData)
    })
  }
 joinGame(state) {
  store.set(state);
    this.setState({
      game_data:{...state}
    },()=>{
     server.joinGame(this.state.game_data.game_id,this.updateGameData)
    })
  }
  render() {
    return (
      <div className="App">
        {/* With multiple sections */}
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection alignStart>
              {/* <ToolbarMenuIcon use="menu"/> */}
              <ToolbarTitle>TheTown</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              {/* <ToolbarIcon use="save"/>
              <ToolbarIcon use="print"/> */}
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>

        <TabBar
          activeTabIndex={this.state.activeTabIndex || 0}
          onChange={evt => this.setState({'activeTabIndex': evt.target.value})}>
          <Tab>Create</Tab>
          <Tab>Join</Tab>
          <Tab>Play</Tab>
        </TabBar>

        {this.state.activeTabIndex === 0
          ? <Create sync={this.createGame} userId={this.state.userId}/>
          : ''}
          {this.state.activeTabIndex === 2
          ? 
           <Play sync={this.sync} state={this.state.game_data} userId={this.state.userId}/>:''}
          {this.state.activeTabIndex === 1
          ? <Join sync={this.joinGame} userId={this.state.userId}/>
          : ''}

      </div>
    );
  }
}

export default App;
