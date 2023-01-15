import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";

class Playerviewer extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
        this.addDirectionTracking();
    }

    addDirectionTracking() {
        this.addActionNew(new ViewDirection(this.spriteNew));
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
}   
export default Playerviewer;