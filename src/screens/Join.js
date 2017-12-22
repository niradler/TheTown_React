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
        this.state = {
            name: "Player " + props.userId
        };
    }
    componentWillMount() {
        debugger;
    }

    joinGame() {
        if(this.state.name && this.state.game_id){
            this
            .props
            .sync(this.state)

        }else{
            alert('missing values!')
        }
        
    }
    render() {
        return (
            <div className="Create">
                <Grid>
                    <GridCell span="12">

                        <Card
                            style={{
                            width: '320px',
                            margin:'auto'
                        }}>

                            <CardPrimary>
                                <CardTitle large>Join</CardTitle>
                            </CardPrimary>
                            <CardSupportingText>
                                <FormField>
                                    <TextField
                                        label="Name"
                                        onChange={(e) => this.setState({name: e.target.value})}
                                        value={this.state.name}
                                        type="text"
                                        id="name"/>
                                </FormField>
                                <FormField>
                                    <TextField
                                        label="Game ID"
                                        onChange={(e) => this.setState({game_id: e.target.value})}
                                        type="text" id="gameId"/>
                                </FormField>
                            </CardSupportingText>
                            <CardActions>
                                <CardAction></CardAction>
                                <CardAction></CardAction>
                                <CardAction>
                                    <Button
                                        raised
                                        onClick={this
                                        .joinGame
                                        .bind(this)}>Join</Button>
                                </CardAction>
                                <CardAction></CardAction>

                            </CardActions>
                        </Card>

                    </GridCell>

                </Grid>

            </div>
        );
    }
}

export default Create;
