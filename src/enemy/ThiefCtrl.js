import CtrEnemyFly from "../actions/CtrEnemyFly";
import CtrFollowTarget from "../actions/CtrFollowTarget";
import CtrListenFrozen from "../actions/CtrListenFrozen";
import CtrMoveToTargetX from "../actions/CtrMoveToTargetX";
import CtrSteal from "../actions/CtrSteal";
import CtrStealDive from "../actions/CtrStealDive";
import CtrWait from "../actions/CtrWait";
import BaseController from "../classes/BaseController";
import Depths from "../consts/Depths";
import FnNames from "../consts/FnNames";
import States from "../consts/States";

class ThiefCtrl extends BaseController {

    constructor(target) {
        super(target);
        this.scene = this.sprite.scene;
        this.setDefaults();
    }
    
    setDefaults() {
        this.addFlying();
        this.followPlayer();
        this.listenForFrozenPrey();
    }

    addFlying() {
        this.addAction(new CtrEnemyFly(this.sprite), false);
    }

    followPlayer() {
        let player = this.scene.player;
        let distance = Phaser.Math.Between(6, 11);
        this.addAction(new CtrFollowTarget(this.sprite, player).setDistance(distance));
    }

    listenForFrozenPrey() {
        this.addAction(new CtrListenFrozen(this.sprite).addCallback(()=>{
            this.moveToFrozenPrey();
        }));
    }

    moveToFrozenPrey() {
        this.target.removeUpdateFn(FnNames.ACT_FOLLOW_TARGET);
        let preySprite = this.scene.getClosestFrozen(this.sprite);
        this.addAction(new CtrMoveToTargetX(this.sprite, preySprite).addCallback(()=>{
            this.dropToCollect(preySprite);
        }));
    }

    dropToCollect(preySprite) {
        this.target.removeUpdateFn(FnNames.ACT_ENEMY_FLY);
        this.addAction(new CtrStealDive(this.sprite, preySprite).addCallback(()=>{
            this.attemptToSteal(preySprite);
        }));
    }

    attemptToSteal(preySprite) {
        let prey = preySprite.parent;
        if (prey.isStateEquals(States.FROZEN)) {
            prey.setState(States.STOLEN);
            prey.setDepth(Depths.ENEMIES_STOLEN);
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