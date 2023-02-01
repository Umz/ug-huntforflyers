import BaseController from "classes/BaseController";
import CtrWait from "actions/CtrWait";
import WorldConsts from "../../consts/WorldConsts";

class PlayerController extends BaseController {

    constructor(sprite) {
        super(sprite);

        this.isFireReady = true;
        this.cooldownTime = 200;
    }

    moveLeft() {
        this.spriteNew.setVelocityX(-this.spriteNew.getSpeed());
    }

    moveRight() {
        this.spriteNew.setVelocityX(this.spriteNew.getSpeed());
    }

    fireAction() {
        if (this.isFireReady) {
            this.isFireReady = false;
            this.addActionNew(new CtrWait(this.cooldownTime).addCallback(()=>{
                this.isFireReady = true;
            }));
        }
    }

    hit() {
        //  Kickback from explosions
        let mul = Math.random() > .5 ? 1 : -1;
        let velX = WorldConsts.WIDTH * 1.3 * mul;
        this.sprite.setY(this.sprite.y - 16);
        this.sprite.setVelocity(velX, -WorldConsts.HEIGHT * .1);
    }
}
export default PlayerController;