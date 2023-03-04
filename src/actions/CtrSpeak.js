import Action from "classes/Action";
import Actions from "consts/Actions";

class CtrSpeak extends Action {
    
    constructor(sprite, icon, time) {
        super(Actions.ACT_SPEAK);
        sprite.scene.showIcon(sprite, time, icon);
        this.setComplete();
    }

    subclassUpdate(time, delta) {}
}
export default CtrSpeak;