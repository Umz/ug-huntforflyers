import BaseController from "classes/BaseController";
import Depths from "consts/Depths";
import States from "consts/States";
import ViewDirection from "actions/ViewDirection";
import CtrListenStateChange from "../../actions/CtrListenStateChange";
import ViewSparkle from "../../actions/ViewSparkle";

class PreyViewer extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.model = sprite.model;

        this.addFlappingAnimation();
        this.addDirectionTracking();
        this.addSpawnStateChange();
    }

    addFlappingAnimation() {
        this.sprite.anims.play(this.model.animation);
    }

    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite).setDefaultFaceRight(false));
    }

    addSpawnStateChange() {
        this.addAction(new CtrListenStateChange(this.sprite, States.NORMAL).addCallback(()=>{
            this.sprite.setDepth(Depths.ENEMIES);
        }));
    }

    addFlashing() {
        this.addAction(new ViewSparkle(this.sprite));
    }
}   
export default PreyViewer;