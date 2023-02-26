import CtrCarryPreyHome from "actions/CtrCarryPreyHome";
import CtrListenFrozen from "actions/CtrListenFrozen";
import CtrMoveToPrey from "actions/CtrMoveToPrey";
import BaseController from "classes/BaseController";
import Actions from "consts/Actions";
import States from "consts/States";
import Depths from "consts/Depths";
import CtrFollowSprite from "actions/CtrFollowSprite";

class CarryKinCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;
    }

    setDefaultActions() {
        
        let player = this.scene.player;
        let distance = Math.random() * 4 + 1;

        this.addAction(new CtrFollowSprite(this.sprite, player).setDistance(distance));
        this.addAction(new CtrListenFrozen(this.sprite).addCallback(()=>{
            this.moveToFrozenPrey();
        }));
    }

    moveToFrozenPrey() {

        let prey = this.scene.getClosestFrozen(this.sprite);
        this.addAction(new CtrMoveToPrey(this.sprite, prey).addCallback(()=>{
            this.carryPreyToCollectionPoint(prey);
        }));

        this.sprite.controller.removeAction(Actions.ACT_FOLLOW_TARGET);
    }
    
    carryPreyToCollectionPoint(prey) {

        if (prey.isState(States.FROZEN)) {

            prey.setState(States.CARRIED);
            prey.setCarriedCollision();
            prey.setDepth(Depths.ENEMIES_CARRIED);

            this.addAction(new CtrCarryPreyHome(this.sprite, prey));
        }
    }
}
export default CarryKinCtrl;