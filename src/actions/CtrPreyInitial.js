import Action from "classes/Action";
import FnNames from "consts/FnNames";
import WorldConsts from "consts/WorldConsts";
import States from "consts/States";

class CtrPreyInitial extends Action {

    constructor(sprite) {
        super(FnNames.ACT_PREY_INIT);
        this.sprite = sprite;
    }

    subclassUpdate(time, delta) {
        if (this.sprite.y <= WorldConsts.FLYING_HEIGHT_MID_Y + 10 && this.sprite.isState(States.JUST_SPAWNED)) {
            this.sprite.setState(States.NORMAL);
            this.setComplete();
        }
    }
}
export default CtrPreyInitial;