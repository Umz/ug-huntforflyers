import CtrEnemyFly from "actions/CtrEnemyFly";
import CtrFollowSprite from "actions/CtrFollowSprite";
import CtrListenFrozen from "actions/CtrListenFrozen";
import CtrMoveToTargetX from "actions/CtrMoveToTargetX";
import CtrSteal from "actions/CtrSteal";
import CtrStealDive from "actions/CtrStealDive";
import CtrBlank from "actions/CtrBlank";
import CtrWait from "actions/CtrWait";
import BaseController from "classes/BaseController";
import Depths from "consts/Depths";
import States from "consts/States";
import Actions from "consts/Actions";
import CtrCarryRocket from "../../actions/CtrCarryRocket";
import Sfx from "../../consts/Sfx";

class ThiefCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
    }
    
    setDefaultActions() {
        this.addAction(new CtrEnemyFly(this.sprite));
        this.addAction(new CtrWait(Phaser.Math.Between(4000, 7000)).addCallback(()=>{
            this.loadRocket();
            this.moveToPlayer();
        }));
    }

    loadRocket() {
        let rocket = this.scene.addRocketToScene();
        let act = new CtrCarryRocket(this.sprite, rocket);
        this.addAction(act);
        this.rocket = rocket;
    }

    moveToPlayer() {
        let act = new CtrMoveToTargetX(this.sprite, this.scene.player);
        act.addCallback(()=>{
            this.dropRocket();
        });
        this.addAction(act);
    }

    dropRocket() {
        this.clearAllActions();
        this.sprite.setVelocityX(this.sprite.velocityX * .2);
        this.rocket.drop();

        let sndM = this.scene.soundManager;
        sndM.play(Sfx.BOMBER_DROP_MISSLE);
    }

    hit() {
        
        this.sprite.setY(this.sprite.y - 8);

        if (this.sprite.isDead()) {
            this.sprite.kill();
            this.sprite.destroy();
            //  Blow up BIG in sky (holding a rocket)
        }
    }
}
export default ThiefCtrl;