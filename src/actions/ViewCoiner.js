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
        if (speed > 4)
            this.sprite.anims.play(model.run, true);
        else
            this.sprite.setFrame(this.model.frame);
    }

    get velX() { return this.sprite.body.velocity.x }
}
export default ViewCoiner;