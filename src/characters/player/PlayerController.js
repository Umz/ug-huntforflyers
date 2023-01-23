import BaseController from "classes/BaseController";
import WorldConsts from "../../consts/WorldConsts";

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
        this.spriteNew.setVelocityY(-10);
    }

    hit() {
        //  Kickback from explosions
        let mul = Math.random() > .5 ? 1 : -1;
        let velX = WorldConsts.WIDTH * mul;
        this.sprite.setY(this.sprite.y - 16);
        this.sprite.setVelocity(velX, -WorldConsts.HEIGHT * .5);
    }
}
export default PlayerController;