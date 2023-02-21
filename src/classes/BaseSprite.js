import States from "consts/States";
import WorldConsts from "consts/WorldConsts";

class BaseSprite extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, atlas, frame) {
        super(scene, x, y, atlas, frame);
        this.state = States.NORMAL;
        this.hp = 1;
    }

    update(time, delta) {
        this.controller.update(time, delta);
        this.view.update(time, delta);
    }

    flash(tint, time) {

        this.clearTint();
        this.setTintFill(tint);

        this.scene.time.addEvent({
            delay: time,
            callback: ()=>{
                this.clearTint();
            }
        });
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

    isAlive() {
        return !this.isDead();
    }

    kill() {
        this.controller.clearAllActions();
        this.view.clearAllActions();
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
        this.model = JSON.parse(JSON.stringify(model));
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