import CtrEnemyFly from "actions/CtrEnemyFly";
import CtrFollowSprite from "actions/CtrFollowSprite";
import CtrListenFrozen from "actions/CtrListenFrozen";
import CtrMoveToTargetX from "actions/CtrMoveToTargetX";
import CtrSteal from "actions/CtrSteal";
import CtrStealDive from "actions/CtrStealDive";
import CtrBlank from "actions/CtrBlank";
import BaseController from "classes/BaseController";
import Depths from "consts/Depths";
import States from "consts/States";
import Actions from "consts/Actions";

class ThiefCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
        
        this.addNoActionListener();     // DELETE after Base removed
    }
    
    setDefaultActions() {

        this.addActionNew(new CtrEnemyFly(this.spriteNew));

        let player = this.scene.player;
        let distance = Phaser.Math.Between(3, 7);
        this.addActionNew(new CtrFollowSprite(this.spriteNew, player).setDistance(distance));
    }

    hit() {
        
        this.clearAllActions();
        this.addActionNew(new CtrBlank(this.spriteNew));
        
        this.spriteNew.setState(States.CRASHING);

        this.spriteNew.setAngularVelocity(90);
        this.spriteNew.setAccelerationY(10);
        if (this.spriteNew.body.velocity.y <= 5)
            this.spriteNew.setVelocityY(10);

        //  Blow up BIG in sky (holding a rocket)
    }
}
export default ThiefCtrl;