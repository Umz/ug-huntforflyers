import Action from "classes/Action";
import Actions from "consts/Actions";

class CtrBlank extends Action {
    constructor() {
        super(Actions.ACT_BLANK);
    }

    subclassUpdate(time, delta) {
    }
}
export default CtrBlank;