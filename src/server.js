import firebase from 'firebase';
import store from './store';
class Server {
    constructor(config) {
        this.firebase = firebase.initializeApp(config);
        this.firebaseRef = firebase.database().ref('games');
        this.c_player=null;
       
    }
    createGame(game) {
        var gameKey = this.firebase.database().ref().child('games').push(game).key;
        console.log('gameKey', gameKey);
        return gameKey;
    }
    joinGame(game_id, cb) {
        if(!game_id)alert('missing game id!')
        this.firebase.database().ref('/games/' + game_id).once('value', (snapshot) => {
            const game = snapshot.val();
            if(!game)return null;
            const game_store = store.get();
            const user_id=store.getId();
            game.isFull=false;
            console.log(game);
            if (game.c_player && game.c_player._id) {
                delete game.c_player;
            }
                if (game.players_join) {
                    var playing = game.players_join.filter((p)=> p._id ===user_id)
                    if (game.players_join.length < game.players_map.length && !(playing&&playing.length!==0) ){
                        game.c_player = game.players_map[game.players_join.length];
                        game.c_player.name = game_store.name;
                        game.c_player._id = user_id;
                        this.c_player = game.c_player;
                        this.firebase.database().ref('/games/' + game_id).child('players_join').set([...game.players_join, game.c_player]);
                        if(game.players_map.length === game.players_join.length+1){
                            this.firebase.database().ref('/games/' + game_id).child('status').set(1);
                        }
                    } else {
                        try{
                            
                            if (playing.length==1) {
                                game.c_player = playing[0];
                                this.c_player = game.c_player
                                game.c_player.name = game_store.name
                            }else{
                                debugger;
                                alert('game is full!')
                                console.log('game is full!')
                                return null;
                            }
                        }catch(e){
                            debugger;
                            alert('game is full!')
                            console.log('game is full!')
                            return null;
                        }
                       
                    }
                } else {
                    game.c_player = game.players_map[0];
                    game.c_player._id = user_id;
                    this.c_player = game.c_player
                    game.c_player.name = game_store.name
                    this.firebase.database().ref('/games/' + game_id).child('players_join').set([game.c_player]);
                }

            game.game_id = game_id;
            store.set(game);
            cb(game);
        })
    }
    runningGame(game_id,cb){
        if(!game_id)alert('missing game id!')
        this.firebase.database().ref('/games/' + game_id).on('value', (snapshot) => {
            const game = snapshot.val();
            cb(game);
        })
    }
}
const config = {
    apiKey: "AIzaSyAnqHDI_71jhBPvkR0F8W1Ivau29B0gW5o",
    authDomain: "the-town.firebaseapp.com",
    databaseURL: "https://the-town.firebaseio.com",
    projectId: "the-town",
    storageBucket: "the-town.appspot.com",
    messagingSenderId: "91542406719"
};
const server = new Server(config)
export default server;