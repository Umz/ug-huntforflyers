import BaseController from "classes/BaseController";
import Depths from "consts/Depths";
import States from "consts/States";
import ViewDirection from "actions/ViewDirection";
import CtrListenStateChange from "../../actions/CtrListenStateChange";

class PreyViewer extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.model = sprite.model;

        this.addFlappingAnimation();
        this.addDirectionTracking();
        this.addSpawnStateChange();
    }

    addFlappingAnimation() {
        this.spriteNew.anims.play(this.model.animation);
    }

    addDirectionTracking() {
        this.addActionNew(new ViewDirection(this.spriteNew).setDefaultFaceRight(false));
    }

    addSpawnStateChange() {
        this.addActionNew(new CtrListenStateChange(this.spriteNew, States.NORMAL).addCallback(()=>{
            this.spriteNew.setDepth(Depths.ENEMIES);
        }));
    }
}   
export default PreyViewer;