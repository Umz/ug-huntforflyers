import Action from "classes/Action";
import Actions from "consts/Actions";
import WorldConsts from "consts/WorldConsts";
import States from "consts/States";

class CtrPreyInitial extends Action {

    constructor(sprite) {
        super(Actions.ACT_PREY_INIT);
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