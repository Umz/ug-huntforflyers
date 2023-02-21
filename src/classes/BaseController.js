import ActionChain from "./ActionChain";

class BaseController {

    constructor(target) {

        this.sprite = target;
        this.scene = target.scene;
        this.stats = target.stats;

        this.activeActionMap = new Map();
        this.backgroundActionMap = new Map();
    }

    update(time, delta) {

        mapUpdate(this.backgroundActionMap, time, delta);
        mapUpdate(this.activeActionMap, time, delta);

        if (this.activeActionMap.size === 0)
            this.setDefaultActions();
    }
    
    setDefaultActions() {}

    addAction(action) {
        this.activeActionMap.set(action.name, action);
    }

    addBackgroundAction(action) {
        this.backgroundActionMap.set(action.name, action);
    }

    addActionChain() {
        let chain = new ActionChain();
        this.addAction(chain);
        return chain;
    }

    removeAction(actionName) {
        this.activeActionMap.delete(actionName);
    }

    clearAllActions() {
        this.activeActionMap.clear();
    }
}
export default BaseController;

function mapUpdate(map, time, delta) {
    let completeActions = [];
    for (let action of map.values()) {
        action.update(time, delta);
        if (action.isComplete()) {
            completeActions.push(action.name);
        }
    }
    for (let actionName of completeActions)
        map.delete(actionName);
};