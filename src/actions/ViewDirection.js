import Action from "classes/Action";
import Actions from "consts/Actions";

class ViewDirection extends Action {

    constructor(sprite) {
        super(Actions.VIEW_FACE_DIRECTION);
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