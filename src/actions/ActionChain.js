import Action from "classes/Action";
import Actions from "consts/Actions";

class ActChain extends Action {
    
    constructor() {
        super(Actions.ACT_CHAIN);

        this.queue = [];
        this.totalQueue = 0;
        this.index = 0;

        this.addToController = {};
        this.chainedAction = null;
    }

    chain(action) {
        this.queue.push(action);
        this.totalQueue = this.queue.length;
        this.addName(action.name);
        return this;
    }

    nextAction() {
        this.chainedAction.setAddToControllerFn(this.addToController);
        this.addToController(this.chainedAction);
        //addChatMessage('Civ', 'Calling next fn');
    }

    subclassUpdate(time, delta) {

        let current = this.queue[this.index];

        current.update(time, delta);
        if (current.isComplete())
            this.index ++;

        if (this.index >= this.totalQueue)
            this.setComplete();
    }
}
export default ActChain;