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
        this.addAction(new CtrPreyInitial(this.sprite));
    }

    addFlying() {
        this.addAction(new CtrPreyFly(this.sprite));
    }

    addLocalMovement() {
        this.addAction(new CtrPreyLocalFlight(this.sprite));
    }
}
export default PreyController;