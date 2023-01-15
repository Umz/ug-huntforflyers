import Action from "classes/Action";
import FnNames from "consts/FnNames";

class ViewDirection extends Action {

    constructor(sprite) {
        super(FnNames.VIEW_FACE_DIRECTION);
        this.sprite = sprite;
        this.defaultFacingRight = true;
    }

    subclassUpdate(time, delta) {
        let movingLeft = (this.sprite.body.velocity.x < 0);
        let flip = (movingLeft && this.defaultFacingRight) || (!movingLeft && !this.defaultFacingRight);
        this.sprite.setFlipX(flip);
    }

    setDefaultFaceRight(isFacingRight) {
        this.defaultFacingRight = isFacingRight;
        return this;
    }
}
export default ViewDirection;