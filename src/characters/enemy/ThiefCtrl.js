import CtrEnemyFly from "actions/CtrEnemyFly";
import CtrFollowSprite from "actions/CtrFollowSprite";
import CtrListenFrozen from "actions/CtrListenFrozen";
import CtrMoveToTargetX from "actions/CtrMoveToTargetX";
import CtrSteal from "actions/CtrSteal";
import CtrStealDive from "actions/CtrStealDive";
import CtrWait from "actions/CtrWait";
import BaseController from "classes/BaseController";
import Depths from "consts/Depths";
import FnNames from "consts/FnNames";
import States from "consts/States";

class ThiefCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
        
        this.addNoActionListener();     // DELETE after Base removed
    }
    
    setDefaultActions() {

        this.addActionNew(new CtrEnemyFly(this.spriteNew));

        let player = this.scene.player;
        let distance = Phaser.Math.Between(6, 11);
        this.addActionNew(new CtrFollowSprite(this.spriteNew, player).setDistance(distance));

        this.addActionNew(new CtrListenFrozen(this.spriteNew).listenForCarried().addCallback(()=>{
            this.moveToFrozenPrey();
        }));
    }

    moveToFrozenPrey() {

        let prey = this.scene.getClosestFrozen(this.spriteNew, [States.FROZEN, States.CARRIED]);
        
        this.addActionNew(new CtrMoveToTargetX(this.spriteNew, prey).addCallback(()=>{
            this.dropToCollect(prey);
        }));
        
        this.spriteNew.removeAction(FnNames.ACT_FOLLOW_TARGET);
    }

    dropToCollect(prey) {
        let parent = prey.parent;
        if (parent.isStateEquals(States.FROZEN) || parent.isStateEquals(States.CARRIED)) {
            this.addActionNew(new CtrStealDive(this.spriteNew, prey).addCallback(()=>{
                this.attemptToSteal(prey);
            }));
            this.spriteNew.removeAction(FnNames.ACT_ENEMY_FLY);
        }
        else {
            this.clearAllActions();
        }
    }

    attemptToSteal(prey) {
        let parent = prey.parent;
        if (parent.isStateEquals(States.FROZEN) || parent.isStateEquals(States.CARRIED)) {
            parent.setDepth(Depths.ENEMIES_STOLEN);
            this.scene.setPreyStolenCollisions(prey);
            this.addActionNew(new CtrSteal(this.spriteNew, prey));
        }
        else {
            this.clearAllActions();
        }
    }

    setToCrash() {
        this.clearAllActions();
        this.spriteNew.setAngularVelocity(90);
        this.spriteNew.setAccelerationY(10);
        if (this.spriteNew.body.velocity.y <= 10)
            this.spriteNew.setVelocityY(10);

        //  Blow up just above ground level
    }
}
export default ThiefCtrl;