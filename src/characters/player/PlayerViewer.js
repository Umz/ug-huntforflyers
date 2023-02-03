import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";
import ViewRunStop from "actions/ViewRunStop";
import States from "consts/States";

class Playerviewer extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
        
        this.addDirectionTracking();
        this.addAnimation();
    }

    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite));
    }

    addAnimation() {
        this.addAction(new ViewRunStop(this.sprite));
    }

    showFireAnimation() {
        
        this.sprite.clearTint();
        this.sprite.setTintFill(0xFFFFFF);

        this.scene.time.addEvent({
            delay: 100,
            callback: ()=>{
                this.sprite.clearTint();
            }
        });
    }

    hit() {
        this.flash(0xFFFFFF, 150);
    }

    updateAnimation() {

        const model = this.sprite.model;
        
        let modes = [
            {state: States.MODE_HUNT, anim: model.huntAnim, idle: model.huntIdle},
            {state: States.MODE_CANNON, anim: model.cannonAnim, idle: model.cannonIdle},
            {state: States.MODE_TANK, anim: model.tankAnim, idle: model.tankIdle}
        ];
        let state = this.sprite.getState();
        let current = modes.find(m => m.state === state);

        this.flash(0xFFFFFF, 150);

        this.sprite.model.frame = current.idle;
        this.sprite.model.run = current.anim;
        this.sprite.play(current.anim);
    }

    flash(tint, time) {

        this.sprite.clearTint();
        this.sprite.setTintFill(tint);

        this.scene.time.addEvent({
            delay: time,
            callback: ()=>{
                this.sprite.clearTint();
            }
        });
    }
}   
export default Playerviewer;