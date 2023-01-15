import Action from "classes/Action";
import FnNames from "consts/FnNames";

class CtrListenStateChange extends Action {

    constructor(sprite, state) {
        super(FnNames.ACT_STATE_CHANGE);
        this.sprite = sprite;
        this.state = state;
    }

    subclassUpdate(time, delta) {
        if (this.sprite.isState(this.state)) {
            this.setComplete();
        }
    }
}
export default CtrListenStateChange;