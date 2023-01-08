import States from "../consts/States";
import WorldConsts from "../consts/WorldConsts";
import Action from "./Action";
import ActionChain from "./ActionChain";

class Base {

    constructor(scene, model) {
        this.scene = scene;
        this.model = model;
        this.updateFunctions = new Map();
        this.state = States.NORMAL;
    }

    init() {
        this.sprite.update = (time, delta) => {
            let complete = [];

            for (let fn of this.updateFunctions.values())
                if (fn instanceof Action || fn instanceof ActionChain) {
                    fn.update(time, delta);
                    if (fn.isComplete())
                        complete.push(fn.name);
                }
                else
                    fn(time, delta);

            for (let actionName of complete)
                this.removeUpdateFn(actionName);
        }
        this.sprite.parent = this;
        return this;
    }

    setController(ctrl) {
        this.controller = ctrl;
    }

    setView(view) {
        this.view = view;
    }

    die() {
        this.updateFunctions.clear();
        this.setState(States.DEAD);
    }

    addUpdateFn(key, fn) {
        this.updateFunctions.set(key, fn);
    }

    removeUpdateFn(key) {
        this.updateFunctions.delete(key);
    }

    destroy() {
        this.sprite.destroy();
        this.setState(States.DEAD);
        this.updateFunctions.clear();
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

    calcVelocityX() {
        return this.stats.relativeSpeed * WorldConsts.BASE_MOVE_SPEED;
    }

    get stats() {
        return {
            speed: this.model.speed,
            relativeSpeed: this.model.relativeSpeed,
            value: this.model.value,
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