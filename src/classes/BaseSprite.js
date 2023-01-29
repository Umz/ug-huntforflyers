import States from "consts/States";
import WorldConsts from "consts/WorldConsts";

class BaseSprite extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);

        this.actionMap = new Map();
        this.state = States.NORMAL;
        this.hp = 1;
    }

    update(time, delta) {

        let complete = [];

        for (let action of this.actionMap.values()) {
            action.update(time, delta);
            if (action.isComplete()) {
                complete.push(action.name);
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

    hit(dmg = 1) {
        this.hp -= dmg;

        if (typeof this.controller.hit === "function") { 
            this.controller.hit();
        }
        if (typeof this.view.hit === "function") { 
            this.view.hit();
        }
    }

    isDead() {
        return this.hp <= 0;
    }

    kill() {
        this.actionMap.clear();
        this.setState(States.DEAD);
        this.setVisible(false).setActive(false);
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
        this.hp = this.model.hp || 1;
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