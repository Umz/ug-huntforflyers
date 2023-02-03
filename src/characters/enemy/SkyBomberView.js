import ViewDirection from "actions/ViewDirection";
import BaseController from "classes/BaseController";

class SkyBomberView extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;

        this.addDirectionTracking();
        this.playFlyingAnimation();
    }

    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite));
    }

    playFlyingAnimation() {
        let model = this.sprite.model;
        this.sprite.anims.play(model.idle, true);
    }

    hit() {
        
        this.sprite.setTintFill(0xFFFFFF);
        this.scene.time.addEvent({
            delay: 100,
            callback: ()=>{
                this.sprite.clearTint();
            }
        });
    }
}
export default SkyBomberView;