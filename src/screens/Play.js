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
import {Button} from 'rmwc';
import {Grid, GridCell, Icon} from 'rmwc';
import {List, ListItemEndDetail, ListItem, ListItemText, ListItemStartDetail} from 'rmwc';
import server from "../server";
class Play extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  componentWillMount() {
    console.log('play mount', this.props.state)
    server.runningGame(this.props.state.game_id, (game) => {
      const state = this.props.state;
      state.players_join = game.players_join || [];
      this.setState({
        ...state,
        ...game
      }, () => {
        if (this.props.state.players_map.length === 0 || game.isFull) {
          this
            .props
            .sync({activeTabIndex: 0})
        }
      })
    })

  }
  // getUserAction(){
  //   switch(){

  //   }
  // }
  startGame(){
    let audio = new Audio('audio/good-night.ogg');
    audio.play();
    server.updateGame(1);
    this.setState({game_stage:2})
  }
  render() {
    const game_audio = [
      'good-night.ogg',
      'who-to-kill-a.ogg',
      'who-to-kill-a-end.ogg',
      'who-to-kill-b.ogg',
      'who-to-kill-b-end.ogg',
      'detect.ogg',
      'detect-end.ogg'
    ];
    const result_audio = ['yes-kill-yes-detect.ogg', 'yes-kill-no-detect.ogg', 'no-kill-yes-detect.ogg', 'no-kill-no-det.ogg'];
    return (
      <div className="Play">
        <Grid>
          <GridCell span="12">

            <Card
              style={{
              width: '320px',
              margin: 'auto'
            }}>

              <CardPrimary>
                <CardTitle large>Playing  
                </CardTitle>
                <CardSubtitle >
                <a href={`https://web.whatsapp.com/send?text=${this.state.game_id}`} data-action="share/whatsapp/share">{this.state.game_id} </a>
                  
                  {this.state.status
                    ? <Icon>done_all</Icon>
                    : <Icon>alarm</Icon>}
                </CardSubtitle>
              </CardPrimary>
              <CardSupportingText>
              {this.state.status &&(!this.state.game_stage || this.state.game_stage<2) &&this.state.c_player._id === this.state.game_owner
                    ? <Button
                                        raised
                                        onClick={this
                                        .startGame
                                        .bind(this)}>Start Game</Button>
                    : ''}
                <List>
                  {this.state.players_join
                    ? this
                      .state
                      .players_join
                      .map((p) => (

                        <ListItem ripple key={p.index}>
                          {/* {this.state.c_player.index === p.index
                            ? <ListItemStartDetail>star_border</ListItemStartDetail>
                            : ''} */}
                          {this.state.showRole !== p.index
                            ? <ListItemText>{p.name}</ListItemText>
                            : <ListItemText>{p.role === 'Citizen'
                                ? p.role
                                : `${p.role} ${p.role_index}`}</ListItemText>}
                          {this.state.c_player.index === p.index
                            ? <ListItemEndDetail
                                onClick={() => {
                                this.setState({
                                  showRole: this.state.showRole === p.index
                                    ? -1
                                    : p.index
                                })
                              }}>visibility</ListItemEndDetail>
                            : <ListItemEndDetail >visibility_off</ListItemEndDetail>
}

                        </ListItem>

                      ))
                    : ''}
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
