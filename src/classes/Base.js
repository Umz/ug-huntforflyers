import States from "../consts/States";

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

    isStateEquals(state) {
        return this.state === state;
    }

    setPosition(x, y) {
        this.sprite.setPosition(x, y);
    }

    setDepth(depth) {
        this.sprite.setDepth(depth);
    }

    setState(state) {
        this.state = state;
    }
    
    getSprite() {
        return this.sprite
    }
    
    getState() {
        return this.state;
    }

    get stats() {
        return {
            speed: this.model.speed,
            relativeSpeed: this.model.relativeSpeed,
        }
    }

    get x() {
        return this.sprite.x;
    }

    get y() {
        return this.sprite.y;
    }
}
export default Base;