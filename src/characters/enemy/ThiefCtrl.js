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
    }
    
    setDefaultActions() {

        this.addAction(new CtrEnemyFly(this.sprite));

        let player = this.scene.player;
        let distance = Phaser.Math.Between(6, 11);
        this.addAction(new CtrFollowSprite(this.sprite, player).setDistance(distance));

        this.addAction(new CtrListenFrozen(this.sprite).listenForCarried().addCallback(()=>{
            this.moveToFrozenPrey();
        }));
    }

    moveToFrozenPrey() {

        let prey = this.scene.getClosestFrozen(this.sprite, [States.FROZEN, States.CARRIED]);
        
        this.addAction(new CtrMoveToTargetX(this.sprite, prey).addCallback(()=>{
            this.dropToCollect(prey);
        }));
        
        this.sprite.controller.removeAction(Actions.ACT_FOLLOW_TARGET);
    }

    dropToCollect(prey) {
        
        if (prey.isState(States.FROZEN) || prey.isState(States.CARRIED)) {
            this.addAction(new CtrStealDive(this.sprite, prey).addCallback(()=>{
                this.attemptToSteal(prey);
            }));
            this.sprite.controller.removeAction(Actions.ACT_ENEMY_FLY);
        }
        else {
            this.clearAllActions();
        }
    }

    attemptToSteal(prey) {
        
        if (prey.isState(States.FROZEN) || prey.isState(States.CARRIED)) {
            prey.setDepth(Depths.ENEMIES_STOLEN);
            prey.setStolenCollision();
            this.addAction(new CtrSteal(this.sprite, prey));

            let sndM = this.scene.soundManager;
            sndM.playSound(Sfx.THIEF_STEAL);
        }
        else {
            this.clearAllActions();
        }
    }

    hit() {
        
        this.clearAllActions();
        this.addAction(new CtrBlank(this.sprite));
        
        this.sprite.setState(States.CRASHING);

        this.sprite.setAngularVelocity(90);
        this.sprite.setAccelerationY(10);
        if (this.sprite.body.velocity.y <= 5)
            this.sprite.setVelocityY(10);

        //  Blow up just above ground level
        if (this.sprite.isDead()) {
            this.sprite.kill();
            this.sprite.destroy();
        }
    }
}
export default ThiefCtrl;