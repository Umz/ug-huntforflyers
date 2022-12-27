class Action {

    constructor(name) {
        this.name = name;
        this.isActionComplete = false;
        this.callbacks = [];
    }

    update(time, delta) {

        this.subclassUpdate(time, delta);

        if (this.isActionComplete) {
            for (let i=this.callbacks.length; --i>=0;) {
                let fn = this.callbacks.shift();
                fn();
            }
        }
        
    }

    subclassUpdate(time, delta) {
        throw Exception("Must be overriden");
    }

    addCallback(fn) {
        this.callbacks.push(fn);
        return this;
    }

    setComplete() {
        this.isActionComplete = true;
    }

    isComplete() {
        return this.isActionComplete;
    }
}
export default Action;