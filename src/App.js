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
import Create from './Create';
import Play from './Play';
import server from "./server";
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      activeTabIndex: 0,
      players: '',
      assassins: '',
      assassins_indexes: [],
      detective: '',
      detective_indexes: [],
      players_map: []
    };
    this.sync = this
      .sync
      .bind(this);
     
  }
  componentWillMount(){
    //server.joinGame()
  }
  sync(state) {
    this.setState({
      ...state
    },()=>{
      server.createGame(this.state)
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
          <Tab>Play</Tab>
        </TabBar>

        {this.state.activeTabIndex === 0
          ? <Create sync={this.sync}/>
          : <Play sync={this.sync} state={this.state}/>}

      </div>
    );
  }
}

export default App;
