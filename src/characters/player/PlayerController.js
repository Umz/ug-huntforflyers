import BaseController from "classes/BaseController";
import CtrWait from "actions/CtrWait";
import CtrMoveToX from "actions/CtrMoveToX";
import WorldConsts from "../../consts/WorldConsts";
import Depths from "../../consts/Depths";
import ActionChain from "../../classes/ActionChain";

class PlayerController extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.isFireReady = true;
        this.cooldownTime = 200;
    }

    respawnMove() {
        
        let toX = this.sprite.x + 32;
        let endX = this.sprite.x + 8;

        let chain = new ActionChain()
            .chain(new CtrWait(250))
            .chain(new CtrMoveToX(this.sprite, toX))
            .chain(new CtrWait(500).addCallback(()=>{
                this.sprite.setDepth(Depths.PLAYERS);
                this.scene.showIcon(this.sprite, 3000, 'ic_speech');
            }))
            .chain(new CtrMoveToX(this.sprite, endX).addCallback(()=>{
                this.scene.controlpad.setActive(true);
            }));

        this.addAction(chain);
    }

    moveLeft() {
        this.sprite.setVelocityX(-this.sprite.getSpeed());
    }

    moveRight() {
        this.sprite.setVelocityX(this.sprite.getSpeed());
    }

    fireAction() {
        if (this.isFireReady) {
            this.isFireReady = false;
            this.addAction(new CtrWait(this.cooldownTime).addCallback(()=>{
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