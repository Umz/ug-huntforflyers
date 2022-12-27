class Action {

    constructor(name) {
        this.name = name;
        this.isActionComplete = false;
        this.callbacks = [];
    }

    update(time, delta) {
        if (this.isActionComplete) {
            for (let i=this.callbacks.length; --i>=0;) {
                let fn = this.callbacks.shift();
                fn();
            }
        }
        else
            this.subclassUpdate(time, delta);
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
}
export default Action;