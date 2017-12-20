import React, {Component} from 'react';
import {
    Card,
    CardPrimary,
    CardTitle,
    CardAction,
    CardSupportingText,
    CardActions
} from 'rmwc';
import {Grid, GridCell} from 'rmwc';
import {Button} from 'rmwc';
import {FormField, TextField} from 'rmwc';

class Create extends Component {
    constructor(props) {
        super();
        this.state = {};
    }
    componentWillMount(){
        this.resetGame(false);
    }
    resetGame(update){
        const state = {
            players: '',
            assassins: '',
            assassins_indexes:[],
            detective:'',
            detective_indexes:[],
            players_map:[]
        };
        this.setState(state,()=>{
            if(update)
            this.props.sync(state)
        })
      
    }
    startGame(){
        const state= this.state;
        state.players_map=[];
        for (let i = 0; i < state.players; i++) {
          state.players_map.push({
            _id:parseInt(Math.random()*10000),
            index:i,
            name:'Player ' + (i+1),
            role:'Citizen'
          })
        }
        let role_counter="A".charCodeAt(0);
        for (let i = 0; i < state.assassins; i++) {
          let p = state.players_map[Math.floor(Math.random() * (state.players))];
          while(p.role !== 'Citizen'){
            p = state.players_map[Math.floor(Math.random() * (state.players))];
          }
          state.assassins_indexes.push(p.index)
         
          p.role = 'Assassin';
          p.role_index = String.fromCharCode(role_counter++);
        }
        role_counter="A".charCodeAt(0);
        for (let i = 0; i < state.detective; i++) {
          let p = state.players_map[Math.floor(Math.random() * (state.players))];
          while(p.role !== 'Citizen'){
            p = state.players_map[Math.floor(Math.random() * (state.players))];
          }
          state.detective_indexes.push(p.index)
          p.role = 'Detective';
          p.role_index = String.fromCharCode(role_counter++);
        }
              
        this.setState(state,()=>{
            state.activeTabIndex=1;
            this.props.sync(state)
        })
        
    }
    render() {
        return (
            <div className="Create">
                <Grid>
                    <GridCell span="12">

                        <Card
                            style={{
                            width: '320px'
                        }}>

                            <CardPrimary>
                                <CardTitle large>Create</CardTitle>
                            </CardPrimary>
                            <CardSupportingText>
                                <FormField>
                                    <TextField label="Number of Players" onChange={(e)=>this.setState({players:e.target.value})} type="number"/>
                                </FormField>
                                <FormField>
                                    <TextField label="Number of Assassins" onChange={(e)=>this.setState({assassins:e.target.value})}  type="number"/>
                                </FormField>
                                <FormField>
                                    <TextField label="Number of Detectives" onChange={(e)=>this.setState({detective:e.target.value})}  type="number"/>
                                </FormField>
                            </CardSupportingText>
                            <CardActions>
                                <CardAction></CardAction>
                                <CardAction>
                                <Button raised theme={['secondary-bg', 'text-primary-on-secondary']} onClick={this.resetGame.bind(this)}>Stop</Button>
                                </CardAction>
                                <CardAction>
                                    <Button raised onClick={this.startGame.bind(this)}>Start</Button>
                                </CardAction>
                                <CardAction>
                                    
                                </CardAction>

                            </CardActions>
                        </Card>

                    </GridCell>

                </Grid>

            </div>
        );
    }
}

export default Create;
