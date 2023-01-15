import Action from "classes/Action";
import Actions from "consts/Actions";

class CtrWait extends Action {

    constructor(time) {
        super(Actions.ACT_WAIT);
        this.time = time;
    }

    subclassUpdate(time, delta) {
        this.time -= delta;
        if (this.time <= 0)
            this.setComplete();
    }
}
export default CtrWait;