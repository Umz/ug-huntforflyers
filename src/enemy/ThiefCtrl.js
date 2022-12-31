import CtrEnemyFly from "../actions/CtrEnemyFly";
import CtrFollowTarget from "../actions/CtrFollowTarget";
import CtrListenFrozen from "../actions/CtrListenFrozen";
import CtrMoveToTargetX from "../actions/CtrMoveToTargetX";
import CtrMoveToX from "../actions/CtrMoveToX";
import CtrSteal from "../actions/CtrSteal";
import CtrStealDive from "../actions/CtrStealDive";
import BaseController from "../classes/BaseController";
import FnNames from "../consts/FnNames";
import States from "../consts/States";

class ThiefCtrl extends BaseController {
    constructor(target) {
        super(target);
        this.scene = this.sprite.scene;

        this.followPlayer();
        this.flyNormal();
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
        let crystal = this.scene.getClosestFrozen(this.sprite);
        this.addAction(new CtrMoveToTargetX(this.sprite, crystal).addCallback(()=>{this.dropToCollect(crystal)}));
    }

    dropToCollect(crystal) {
        this.clearAllActions();
        this.target.removeUpdateFn(FnNames.ACT_ENEMY_FLY);

        this.addAction(new CtrStealDive(this.sprite, crystal).addCallback(()=>{
            this.flyAwayWithSteal(crystal);
        }));
    }

    flyAwayWithSteal(crystal) {
        if (crystal.parent.isStateEquals(States.FROZEN)) {
            crystal.parent.setState(States.STOLEN);
            this.addAction(new CtrSteal(this.sprite, crystal));
            this.target.claimCrystal(crystal);
            crystal.setCollideWorldBounds(false);
            console.log('Successful steal')
        }
        else {
            this.flyNormal();
            this.followPlayer();
            this.listenForFrozen();

            console.log('Resetting to behaviour')
        }
    }

}
export default ThiefCtrl;