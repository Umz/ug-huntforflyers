import Action from "../classes/Action";
import FnNames from "../consts/FnNames";

class ViewDirection extends Action {
    constructor(sprite) {
        super(FnNames.ACT_FACEDIRECTION);
        this.sprite = sprite;
    }

    subclassUpdate(time, delta) {
        let flipX = (this.sprite.body.velocity.x < 0);
        this.sprite.setFlipX(flipX);
    }
}
export default ViewDirection;