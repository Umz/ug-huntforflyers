import CtrEnemyFly from "../actions/CtrEnemyFly";
import CtrFollowTarget from "../actions/CtrFollowTarget";
import CtrListenFrozen from "../actions/CtrListenFrozen";
import CtrMoveToTargetX from "../actions/CtrMoveToTargetX";
import CtrSteal from "../actions/CtrSteal";
import CtrStealDive from "../actions/CtrStealDive";
import CtrWait from "../actions/CtrWait";
import BaseController from "../classes/BaseController";
import FnNames from "../consts/FnNames";
import States from "../consts/States";

class ThiefCtrl extends BaseController {

    constructor(target) {
        super(target);
        this.scene = this.sprite.scene;
        this.setDefaults();
    }
    
    setDefaults() {
        this.flyNormal();
        this.followPlayer();
        this.listenForFrozen();
    }

    flyNormal() {
        this.addAction(new CtrEnemyFly(this.sprite), false);
    }

    followPlayer() {
        let player = this.scene.player;
        let distance = Phaser.Math.Between(6, 11);
        this.addAction(new CtrFollowTarget(this.sprite, player).setDistance(distance));
    }

    listenForFrozen() {
        this.addAction(new CtrListenFrozen(this.sprite).addCallback(()=>{
            this.moveToFrozen();
        }));
    }

    moveToFrozen() {
        this.target.removeUpdateFn(FnNames.ACT_FOLLOW_TARGET);
        let crystal = this.scene.getClosestFrozen(this.sprite);
        this.addAction(new CtrMoveToTargetX(this.sprite, crystal).addCallback(()=>{
            this.dropToCollect(crystal);
        }));
    }

    dropToCollect(crystal) {
        this.target.removeUpdateFn(FnNames.ACT_ENEMY_FLY);
        this.addAction(new CtrStealDive(this.sprite, crystal).addCallback(()=>{
            this.attemptToSteal(crystal);
        }));
    }

    attemptToSteal(preySprite) {
        let prey = preySprite.parent;
        if (prey.isStateEquals(States.FROZEN)) {
            prey.setState(States.STOLEN);
            this.scene.setPreyStolenCollisions(preySprite);
            this.addAction(new CtrSteal(this.sprite, preySprite).addCallback(()=>{
                this.setDefaults();
            }));
        }
        else {
            this.sprite.setVelocityY(-40);
            this.addAction(new CtrWait(500).addCallback(()=>{
                this.setDefaults();
            }));
        }
    }
}
export default ThiefCtrl;