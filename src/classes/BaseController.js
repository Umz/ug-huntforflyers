import WorldConsts from "consts/WorldConsts";
import CtrNoActionListener from "actions/CtrNoActionListener";

class BaseController {

    constructor(target) {

        this.target = target;
        this.sprite = target.sprite;
        this.stats = target.stats;

        this.spriteNew = target;

        this.allActionNames = new Set();
        this.clearableActions = new Set();
        
        // TODO : Once all are converted, call here
        //this.addNoActionListener();
    }

    addActionNew(action) {
        this.spriteNew.addAction(action);
        this.allActionNames.add(action.name);
    }

    setDefaultActions() {
        throw new Error("No Default Actions have been set on this controller");
    }

    addNoActionListener() {
        this.spriteNew.addAction(new CtrNoActionListener(this, this.spriteNew));
    }

    addAction(action, addToClearable = true) {
        this.target.addUpdateFn(action.name, action);
        if (addToClearable)
            this.clearableActions.add(action.name);
    }

    clearAllActions() {
        for (let action of this.clearableActions.values())
            this.target.removeUpdateFn(action);
    }

    addUpdateFn(key, fn) {
        let boundFn = fn.bind(this);
        this.target.addUpdateFn(key, boundFn);
    }

    addUpdateFnAndBindToSprite(key, fn) {
        let boundFn = fn.bind(this.sprite);
        this.target.addUpdateFn(key, boundFn);
    }

    addUpdateFnAndBindToTarget(key, fn) {
        let boundFn = fn.bind(this.target);
        this.target.addUpdateFn(key, boundFn);
    }

    get velocityX() { return WorldConsts.BASE_MOVE_SPEED * this.stats.relativeSpeed }
}
export default BaseController;