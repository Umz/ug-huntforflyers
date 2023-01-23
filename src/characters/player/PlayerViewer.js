import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";
import ViewRunStop from "actions/ViewRunStop";

class Playerviewer extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
        
        this.addDirectionTracking();
        this.addAnimation();
    }

    addDirectionTracking() {
        this.addActionNew(new ViewDirection(this.spriteNew));
    }

    addAnimation() {
        this.addActionNew(new ViewRunStop(this.spriteNew));
    }

    showFireAnimation() {
        
        this.spriteNew.clearTint();
        this.spriteNew.setTintFill(0xFFFFFF);

        this.scene.time.addEvent({
            delay: 100,
            callback: ()=>{
                this.spriteNew.clearTint();
            }
        });
    }

    hit() {
        this.showFireAnimation();
    }
}   
export default Playerviewer;