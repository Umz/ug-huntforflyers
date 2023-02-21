class ActionChain {

    constructor(index = 0) {
        this.name = "chain_" + index;
        this.actions = [];
    }

    update(time, delta) {
        if (!this.isComplete()) {
            let current = this.actions[0];
            current.update(time, delta);
    
            if (current.isComplete())
                this.actions.shift();
        }
    }
    
    chain(action) {
        this.actions.push(action);
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