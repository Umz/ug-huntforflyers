import BaseController from "classes/BaseController";
import CtrPreyInitial from "actions/CtrPreyInitial";
import CtrPreyFly from "actions/CtrPreyFly";
import CtrPreyLocalFlight from "actions/CtrPreyLocalFlight";

class PreyController extends BaseController {

    constructor(sprite) {
        super(sprite);

        this.addInitialSpawnStateChange();
        this.addFlying();
        this.addLocalMovement();
    }

    addInitialSpawnStateChange() {
        this.addActionNew(new CtrPreyInitial(this.spriteNew));
    }

    addFlying() {
        this.addActionNew(new CtrPreyFly(this.spriteNew));
    }

    addLocalMovement() {
        this.addActionNew(new CtrPreyLocalFlight(this.spriteNew));
    }
}
export default PreyController;