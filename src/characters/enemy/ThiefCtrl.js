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
import Sfx from "consts/Sfx";
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
        
        this.spriteNew.removeAction(Actions.ACT_FOLLOW_TARGET);
    }

    dropToCollect(prey) {
        
        if (prey.isState(States.FROZEN) || prey.isState(States.CARRIED)) {
            this.addActionNew(new CtrStealDive(this.spriteNew, prey).addCallback(()=>{
                this.attemptToSteal(prey);
            }));
            this.spriteNew.removeAction(Actions.ACT_ENEMY_FLY);
        }
        else {
            this.clearAllActions();
        }
    }

    attemptToSteal(prey) {
        
        if (prey.isState(States.FROZEN) || prey.isState(States.CARRIED)) {
            prey.setDepth(Depths.ENEMIES_STOLEN);
            prey.setStolenCollision();
            this.addActionNew(new CtrSteal(this.spriteNew, prey));

            let sndM = this.scene.soundManager;
            sndM.playSound(Sfx.THIEF_STEAL);
        }
        else {
            this.clearAllActions();
        }
    }

    hit() {
        
        this.clearAllActions();
        this.addActionNew(new CtrBlank(this.spriteNew));
        
        this.spriteNew.setState(States.CRASHING);

        this.spriteNew.setAngularVelocity(90);
        this.spriteNew.setAccelerationY(10);
        if (this.spriteNew.body.velocity.y <= 5)
            this.spriteNew.setVelocityY(10);

        //  Blow up just above ground level
    }
}
export default ThiefCtrl;