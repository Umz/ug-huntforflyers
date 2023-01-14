import States from "consts/States";
import WorldConsts from "consts/WorldConsts";

class BaseSprite extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.actionMap = new Map();
        this.state = States.NORMAL;
    }

    update(time, delta) {

        let complete = [];

        for (let action of this.actionMap.values()) {
            action.update(time, delta);
            if (action.isComplete()) {
                complete.push(action);
            }
        }

        for (let actionName of complete)
            this.removeAction(actionName);
    }

    addAction(action) {
        let actionName = action.name;
        this.actionMap.set(actionName, action);
    }

    hasAction(actionName) {
        return this.actionMap.has(actionName);
    }

    removeAction(actionName) {
        this.actionMap.delete(actionName);
    }

    kill() {
        this.actionMap.clear();
        this.setState(States.DEAD);
    }

    setState(state) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

    isState(state) {
        return this.state === state;
    }

    getSpeed() {
        return this.stats.relativeSpeed * WorldConsts.BASE_MOVE_SPEED;
    }

    setModel(model) {
        this.model = model;
        return this;
    }

    setView(view) {
        this.view = view;
        return this;
    }

    setController(ctrl) {
        this.controller = ctrl;
        return this;
    }

    get stats() {
        return {
            speed: this.model.speed,
            relativeSpeed: this.model.relativeSpeed,
            value: this.model.value,
        }
    }

    get velocityX() {
        return this.body.velocity.x;
    }

    get velocityY() {
        return this.body.velocity.y;
    }
}
export default BaseSprite;