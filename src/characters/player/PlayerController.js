import BaseController from "classes/BaseController";

class PlayerController extends BaseController {

    constructor(sprite) {
        super(sprite);
    }

    moveLeft() {
        this.spriteNew.setVelocityX(-this.spriteNew.getSpeed());
    }

    moveRight() {
        this.spriteNew.setVelocityX(this.spriteNew.getSpeed());
    }

    moveRecoil() {
        this.spriteNew.y -= 2;
        this.spriteNew.setVelocityY(-10);
    }
}
export default PlayerController;