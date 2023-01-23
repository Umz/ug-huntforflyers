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
        this.addActionNew(new ViewDirection(this.spriteNew));
    }

    playFlyingAnimation() {
        let model = this.spriteNew.model;
        this.spriteNew.anims.play(model.idle, true);
    }

    hit() {
        
        this.spriteNew.setTintFill(0xFFFFFF);
        this.scene.time.addEvent({
            delay: 100,
            callback: ()=>{
                this.sprite.clearTint();
            }
        });
    }
}
export default SkyBomberView;