import CtrCarryPreyHome from "../actions/CtrCarryPreyHome";
import CtrFollowTarget from "../actions/CtrFollowTarget";
import CtrListenFrozen from "../actions/CtrListenFrozen";
import CtrMoveToPrey from "../actions/CtrMoveToPrey";
import CtrWait from "../actions/CtrWait";
import BaseController from "../classes/BaseController";
import FnNames from "../consts/FnNames";
import States from "../consts/States";

class CollectorCtrl extends BaseController {

    constructor(target) {
        super(target);
        this.scene = this.sprite.scene;
        this.setDefaults();
    }

    setDefaults() {
        this.followPlayer();
        this.listenForFrozen();
    }

    followPlayer() {
        let player = this.scene.player;
        let distance = Math.random() * 3 + 1;
        this.addAction(new CtrFollowTarget(this.sprite, player).setDistance(distance));
    }

    listenForFrozen() {
        this.addAction(new CtrListenFrozen(this.sprite).addCallback(()=>{
            this.moveToFrozenPrey();
        }));
    }

    moveToFrozenPrey() {
        this.target.removeUpdateFn(FnNames.ACT_FOLLOW_TARGET);
        let preySprite = this.scene.getClosestFrozen(this.sprite);
        this.addAction(new CtrMoveToPrey(this.sprite, preySprite).addCallback(()=>{
            this.carryPreyToCollectionPoint(preySprite);
        }));
    }
    
    carryPreyToCollectionPoint(preySprite) {

        let prey = preySprite.parent;

        if (prey.isStateEquals(States.FROZEN)) {
            prey.setState(States.CARRIED);
            this.scene.setPreyCarriedCollisions(preySprite);
            this.scene.setPreyCarriedDepth(preySprite);
            this.addAction(new CtrCarryPreyHome(this.sprite, preySprite).addCallback(()=>{
                this.setDefaults();
            }));
        }
        else
            this.addAction(new CtrWait(500).addCallback(()=>{ this.setDefaults() }));
    }
}
export default CollectorCtrl;