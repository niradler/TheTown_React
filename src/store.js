class Store {
    constructor() {
        this.store = this.init();
    }
    init() {
        try {
            return JSON.parse(localStorage.getItem('theTownStore'))
        } catch (e) {
            localStorage.setItem('theTownStore', JSON.stringify({}));
            return JSON.parse(localStorage.getItem('theTownStore'))
        }

    }
    get() {
        return this.store;
    }
    set(game) {
        localStorage.setItem('theTownStore', JSON.stringify(game));
        this.store=game;
    }

}

const store = new Store()
export default store;