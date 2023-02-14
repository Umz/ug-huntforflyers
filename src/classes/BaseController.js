import CtrNoActionListener from "actions/CtrNoActionListener";
import ActionChain from "./ActionChain";

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

    addActionChain() {
        let chain = new ActionChain();
        this.addAction(chain);
        return chain;
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