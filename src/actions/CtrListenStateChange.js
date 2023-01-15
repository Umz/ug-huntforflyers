import Action from "classes/Action";
import Actions from "consts/Actions";

class CtrListenStateChange extends Action {

    constructor(sprite, state) {
        super(Actions.ACT_STATE_CHANGE);
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