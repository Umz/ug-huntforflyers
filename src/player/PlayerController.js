import BaseController from "../classes/BaseController";
import FnNames from "../consts/FnNames";
import States from "../consts/States";
import WorldConsts from "../consts/WorldConsts";

class PlayerController extends BaseController {

    constructor(player) {
        super(player);
        this.addGroundListener();
    }

    moveLeft() {
        this.sprite.setVelocityX(-this.velocityX);
    }

    moveRight() {
        this.sprite.setVelocityX(this.velocityX);
    }

    moveRecoil() {
        this.sprite.y -= 2;
        this.sprite.setVelocityY(-20);
    }

    addGroundListener() {
        this.addUpdateFnAndBindToSprite(FnNames.CTRL_IS_ON_GROUND, function(time, delta) {
            if (this.getBottomCenter().y >= WorldConsts.GROUND_Y && !this.parent.isStateEquals(States.NORMAL))
                this.parent.setState(States.NORMAL);
        });
    }

    get velocityX() { return WorldConsts.BASE_MOVE_SPEED * this.stats.relativeSpeed }
}
export default PlayerController;