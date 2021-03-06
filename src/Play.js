import React, {Component} from 'react';
import {
  Card,
  CardMedia,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardAction,
  CardSupportingText,
  CardActions
} from 'rmwc';
import {Grid, GridCell} from 'rmwc';
import {List, ListItemEndDetail, ListItem, ListItemText, ListItemStartDetail} from 'rmwc';
class Play extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  componentWillMount() {
    this.setState({
      ...this.props.state
    }, () => {
      if (this.props.state.players_map.length == 0) {
        this
          .props
          .sync({activeTabIndex: 0})
      }
    })
  }
  render() {
const state=this.state;
    return (
      <div className="Play">
        <Grid>
          <GridCell span="12">

            <Card style={{
              width: '320px'
            }}>

              <CardPrimary>
                <CardTitle large>Playing</CardTitle>
              </CardPrimary>
              <CardSupportingText>
                <List>
                  {this
                    .state
                    .players_map
                    .map((p) => (

                      <ListItem ripple key={p.index}>
                        <ListItemStartDetail>star_border</ListItemStartDetail>
                        {state.showRole!==p.index?<ListItemText>{p.name}</ListItemText>:
                        <ListItemText>{p.role==='Citizen'?p.role:`${p.role} ${p.role_index}`}</ListItemText>}
                        <ListItemEndDetail onClick={()=>{this.setState({showRole:state.showRole===p.index?-1:p.index})}} >info</ListItemEndDetail>
                      </ListItem>

                    ))}
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
