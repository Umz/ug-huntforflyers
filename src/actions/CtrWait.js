import Action from "classes/Action";
import FnNames from "consts/FnNames";

class CtrWait extends Action {

    constructor(time) {
        super(FnNames.ACT_WAIT);
        this.time = time;
    }

    subclassUpdate(time, delta) {
        this.time -= delta;
        if (this.time <= 0)
            this.setComplete();
    }
}
export default CtrWait;