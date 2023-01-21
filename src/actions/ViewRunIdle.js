import Action from "classes/Action";
import Actions from "consts/Actions";

class ViewRunIdle extends Action {

    constructor(sprite) {
        super(Actions.VIEW_RUN_IDLE);
        this.sprite = sprite;
        this.model = sprite.model;
    }

    subclassUpdate(time, delta) {
        let velocity = Math.abs(this.sprite.velocityX);
        if (velocity > 8) {
            this.sprite.anims.play(this.model.run, true);
        }
        else {
            this.sprite.anims.play(this.model.idle, true);
        }
    }
}
export default ViewRunIdle;