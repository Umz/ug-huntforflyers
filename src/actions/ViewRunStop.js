import Action from "classes/Action";
import Actions from "consts/Actions";

class ViewRunStop extends Action {

    constructor(sprite) {
        super(Actions.VIEW_RUN_STOP);
        this.sprite = sprite;
        this.model = sprite.model;
    }

    subclassUpdate(time, delta) {
        if (Math.abs(this.sprite.velocityX) > 6) {
            this.sprite.anims.play(this.model.run, true);
        }
        else {
            this.sprite.anims.stop();
            this.sprite.setFrame(this.model.frame);
        }
    }
}
export default ViewRunStop;