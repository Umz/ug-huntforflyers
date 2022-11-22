import States from "./States";

class Base {

    constructor(scene) {
        this.updaters = [];
        this.state = States.NORMAL;
    }

    init() {
        this.sprite.update = (time, delta) => {
            for (let fn of this.updaters)
                fn(time, delta);
        }
        this.sprite.parent = this;
        return this;
    }

    addUpdater(fn) {
        this.updaters.push(fn);
    }

    get stats() {
        return {
            speed: this.config.speed
        }
    }
}
export default Base;