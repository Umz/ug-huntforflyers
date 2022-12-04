import States from "./States";

class Base {

    constructor(scene, model) {
        this.model = model;
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

    setPosition(x, y) {
        this.sprite.setPosition(x, y);
    }

    getSprite() {
        return this.sprite
    }

    get stats() {
        return {
            speed: this.model.speed,
            relativeSpeed: this.model.relativeSpeed,
        }
    }
}
export default Base;