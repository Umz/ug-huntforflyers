class Action {

    constructor(name) {

        this.name = name;
        this.isActionComplete = false;
        this.callbacks = [];

        this.initialised = false;
        this.isStopped = false;
    }

    update(time, delta) {

        if (!this.initialised) {
            this.initialised = true;
            this.init();
        }

        //  ONLY while not complete and not stopped
        this.subclassUpdate(time, delta);

        if (this.isActionComplete && !this.isStopped) {
            for (let i=this.callbacks.length; --i>=0;) {
                let fn = this.callbacks.shift();
                fn();
            }
        }        
    }

    subclassUpdate(time, delta) {
        throw new Error(this.constructor.name + " subClassUpdate() must be overriden");
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

    init() { return 0; }

    stop() {
        this.setComplete();
        this.isStopped = true;
    }

    addName(name) {
        this.name += name;
    }
}
export default Action;