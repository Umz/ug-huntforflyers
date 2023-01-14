import Action from "classes/Action";
import FnNames from "consts/FnNames";
import States from "consts/States";

class ViewCollectorAnim extends Action {

    constructor(sprite) {
        super(FnNames.VIEW_COLLECTOR_ANIMATION);

        this.sprite = sprite;
        this.model = sprite.model;
    }

    subclassUpdate(time, delta) {
        
        const run = this.model.run;
        const idle = this.model.idle;
        const carry = this.model.carry;
        const hold = this.model.hold;

        let moving = this.sprite.isState(States.CARRYING) ?  carry : run;
        let still = this.sprite.isState(States.CARRYING) ?  hold : idle;

        let velX = Math.abs(this.sprite.velocityX);
        if (velX > 16)
            this.sprite.anims.play(moving, true);
        else
            this.sprite.anims.play(still, true);
    }
}
export default ViewCollectorAnim;