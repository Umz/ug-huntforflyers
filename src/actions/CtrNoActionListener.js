import Action from "classes/Action";
import FnNames from "consts/FnNames";

class CtrNoActionListener extends Action {

    constructor(controller, sprite) {
        super(FnNames.ACT_NO_ACTIONS);
        this.controller = controller;
        this.sprite = sprite;
    }

    subclassUpdate(time, delta) {
        
        let hasNoActions = true;
        
        for (let actionName of this.controller.allActionNames.values()) {
            if (this.sprite.hasAction(actionName)) {
                hasNoActions = false;
                break;
            }
        }

        if (hasNoActions)
            this.controller.setDefaultActions();
    }
}
export default CtrNoActionListener;