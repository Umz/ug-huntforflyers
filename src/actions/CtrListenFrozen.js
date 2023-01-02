import Action from "../classes/Action";
import FnNames from "../consts/FnNames";

class CtrFlyToFrozen extends Action {
    constructor(sprite) {
        super(FnNames.ACT_LISTENFORFROZEN);
        this.sprite = sprite;
        this.scene = sprite.scene;
        this.includeCarried = false;
    }

    subclassUpdate(time, delta) {
        let count = this.scene.countFrozen(this.includeCarried);
        if (count > 0)
            this.setComplete();
    }

    listenForCarried() {
        this.includeCarried = true;
        return this;
    }
}
export default CtrFlyToFrozen;