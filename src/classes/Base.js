import States from "./States";

class Base {

    constructor(scene, model) {
        this.model = model;
        this.updateFunctions = new Map();
        this.state = States.NORMAL;
    }

    init() {
        this.sprite.update = (time, delta) => {
            for (let fn of this.updateFunctions.values())
                fn(time, delta);
        }
        this.sprite.parent = this;
        return this;
    }

    addUpdateFn(key, fn) {
        this.updateFunctions.set(key, fn);
    }

    removeUpdateFn(key) {
        this.updateFunctions.delete(key);
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