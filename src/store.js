class Store {
    constructor() {
        this.store = {};
        this.Id = 0;
        this.init();
    }
    init() {
        this.createStore();
        this.createUserId();

    }
    createStore() {
        try {
            this.store = JSON.parse(localStorage.getItem('theTownStore'))
        } catch (e) {
            localStorage.setItem('theTownStore', JSON.stringify({}));
            this.store = JSON.parse(localStorage.getItem('theTownStore'))
        }
    }
    createUserId() {
        try {
            const user_id = localStorage.getItem('theTownUserId')
            if(user_id.length >1)
            this.Id = user_id
            else
            this.Id =  Math.round(Math.random() * 100000)
        } catch (e) {
            localStorage.setItem('theTownUserId', Math.round(Math.random() * 100000).toString());
            this.Id = localStorage.getItem('theTownUserId')
        }
    }
    getId() {
        return this.Id;
    }
    get() {
        return this.store;
    }
    set(game) {
        localStorage.setItem('theTownStore', JSON.stringify(game));
        this.store = game;
    }

}

const store = new Store()
export default store;