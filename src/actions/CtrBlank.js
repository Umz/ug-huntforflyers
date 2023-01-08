import Action from "classes/Action";
import FnNames from "consts/FnNames";

class CtrBlank extends Action {
    constructor() {
        super(FnNames.ACT_BLANK);
    }

    subclassUpdate(time, delta) {
    }
}
export default CtrBlank;