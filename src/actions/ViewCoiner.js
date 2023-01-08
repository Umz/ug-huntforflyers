import Action from "classes/Action";
import FnNames from "consts/FnNames";

class ViewCoiner extends Action {

    constructor(coiner) {
        super(FnNames.VIEW_COINER);
        this.model = coiner.model;
        this.sprite = coiner.getSprite();
    }

    subclassUpdate(time, delta) {
        let speed = Math.abs(this.velX);
        if (speed > 6)
            this.sprite.anims.play(this.model.run, true);
        else {
            this.sprite.anims.stop();
            this.sprite.setFrame(this.model.frame);
        }
    }

    get velX() { return this.sprite.body.velocity.x }
}
export default ViewCoiner;