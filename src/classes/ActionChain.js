class ActionChain {

    constructor() {
        this.name = "chain_";
        this.actions = [];
    }

    update(time, delta) {

        let current = this.actions[0];
        current.update(time, delta);

        if (current.isComplete())
            this.actions.shift();
    }
    
    add(action) {
        this.actions.push(action);
        this.name += action.name;
        return this;
    }

    stop() {
        this.actions.length = 0;
        return this;
    }

    setComplete() {
        this.actions.length = 0;
        return this;
    }

    isComplete() {
        return this.actions.length === 0;
    }
}
export default ActionChain;