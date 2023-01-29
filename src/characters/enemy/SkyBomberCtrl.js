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

class ThiefCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
        
        this.addNoActionListener();     // DELETE after Base removed
    }
    
    setDefaultActions() {
        this.addActionNew(new CtrEnemyFly(this.spriteNew));
        this.addActionNew(new CtrWait(Phaser.Math.Between(4000, 7000)).addCallback(()=>{
            this.loadRocket();
            this.moveToPlayer();
        }));
    }

    loadRocket() {
        let rocket = this.scene.addRocketToScene();
        let act = new CtrCarryRocket(this.sprite, rocket);
        this.addActionNew(act);
        this.rocket = rocket;
    }

    moveToPlayer() {
        let act = new CtrMoveToTargetX(this.sprite, this.scene.player);
        act.addCallback(()=>{
            this.dropRocket();
        });
        this.addActionNew(act);
    }

    dropRocket() {
        this.clearAllActions();
        this.sprite.setVelocityX(this.sprite.velocityX * .2);
        this.rocket.drop();
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