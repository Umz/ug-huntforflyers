import CtrNoActionListener from "actions/CtrNoActionListener";

class BaseController {

    constructor(target) {

        this.target = target;
        this.stats = target.stats;
        
        this.sprite = target;

        this.scene = target.scene;

        this.allActionNames = new Set();
        this.clearableActions = new Set();
        
        this.addNoActionListener();
    }

    setDefaultActions() {
    }

    addAction(action) {
        this.sprite.addAction(action);
        this.allActionNames.add(action.name);
    }

    addNoActionListener() {
        this.sprite.addAction(new CtrNoActionListener(this, this.sprite));
    }

    clearAllActions() {
        for (let actionName of this.allActionNames.values())
            this.sprite.removeAction(actionName);
    }
}
export default BaseController;