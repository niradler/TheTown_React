import React, {Component} from 'react';
import {
  Card,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardAction,
  CardSupportingText,
  CardActions
} from 'rmwc';
import {Grid, GridCell} from 'rmwc';
import {List, ListItemEndDetail, ListItem, ListItemText, ListItemStartDetail} from 'rmwc';
import server from "../server";
class Play extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  componentWillMount() {
    console.log('play mount',this.props.state)
    server.runningGame(this.props.state.game_id,(game)=>{
      const state = this.props.state;
      state.players_join = game.players_join || [];
      this.setState(state, () => {
        if (this.props.state.players_map.length === 0) {
          this
            .props
            .sync({activeTabIndex: 0})
        }
      })
    })

  }
  render() {
    return (
      <div className="Play">
        <Grid>
          <GridCell span="12">

            <Card style={{
              width: '320px'
            }}>

              <CardPrimary>
                <CardTitle large>Playing</CardTitle>
                <CardSubtitle >{this.state.game_id} </CardSubtitle>
              </CardPrimary>
              <CardSupportingText>
                <List>
                  {this
                    .state
                    .players_join ?this
                    .state
                    .players_join
                    .map((p) => (

                      <ListItem ripple key={p.index}>
                        {this.state.c_player.index === p.index?<ListItemStartDetail>star_border</ListItemStartDetail>:''}
                        {this.state.showRole!==p.index?<ListItemText>{p.name}</ListItemText>:
                        <ListItemText>{p.role==='Citizen'?p.role:`${p.role} ${p.role_index}`}</ListItemText>}
                        {this.state.c_player.index === p.index?
                          <ListItemEndDetail onClick={()=>{this.setState({showRole:this.state.showRole===p.index?-1:p.index})}} >info</ListItemEndDetail>:
                          <ListItemEndDetail >search</ListItemEndDetail>
                        }
                        
                      </ListItem>

                    )):''}
                </List>
              </CardSupportingText>
              <CardActions></CardActions>
            </Card>

          </GridCell>

        </Grid>

      </div>
    );
  }
}

export default Play;
