import Action from "../classes/Action";
import FnNames from "../consts/FnNames";

class CtrFlyToFrozen extends Action {
    constructor(sprite) {
        super(FnNames.ACT_LISTENFORFROZEN);
        this.sprite = sprite;
        this.scene = sprite.scene;
    }

    subclassUpdate(time, delta) {
        let count = this.scene.countFrozen();
        if (count > 0)
            this.setComplete();
    }
}
export default CtrFlyToFrozen;