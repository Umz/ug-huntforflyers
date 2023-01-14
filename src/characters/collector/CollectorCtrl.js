import CtrCarryPreyHome from "actions/CtrCarryPreyHome";
import CtrListenFrozen from "actions/CtrListenFrozen";
import CtrMoveToPrey from "actions/CtrMoveToPrey";
import CtrWait from "actions/CtrWait";
import BaseController from "classes/BaseController";
import FnNames from "consts/FnNames";
import States from "consts/States";
import CtrFollowSprite from "actions/CtrFollowSprite";

class CollectorCtrl extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.scene = sprite.scene;

        this.addNoActionListener();
    }

    setDefaultActions() {
        
        let player = this.scene.player;
        let distance = Math.random() * 4 + 1;

        this.addActionNew(new CtrFollowSprite(this.spriteNew, player).setDistance(distance));
        this.addActionNew(new CtrListenFrozen(this.spriteNew).addCallback(()=>{
            this.moveToFrozenPrey();
        }));
    }

    moveToFrozenPrey() {

        let prey = this.scene.getClosestFrozen(this.spriteNew);
        this.addActionNew(new CtrMoveToPrey(this.spriteNew, prey).addCallback(()=>{
            this.carryPreyToCollectionPoint(prey);
        }));

        this.spriteNew.removeAction(FnNames.ACT_FOLLOW_TARGET);
    }
    
    carryPreyToCollectionPoint(preySprite) {

        let prey = preySprite.parent;

        if (prey.isStateEquals(States.FROZEN)) {

            prey.setState(States.CARRIED);

            this.scene.setPreyCarriedCollisions(preySprite);
            this.scene.setPreyCarriedDepth(preySprite);

            this.addActionNew(new CtrCarryPreyHome(this.spriteNew, preySprite));
        }
    }
}
export default CollectorCtrl;