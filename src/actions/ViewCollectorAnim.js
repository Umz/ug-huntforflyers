import Action from "../classes/Action";
import FnNames from "../consts/FnNames";
import States from "../consts/States";

class ViewCollectorAnim extends Action {

    constructor(collector) {
        super(FnNames.ACT_COLLECTOR_ANIMATION);

        this.collector = collector;
        this.sprite = collector.sprite;
        this.model = collector.model;
    }

    subclassUpdate(time, delta) {
        
        const run = this.model.run;
        const idle = this.model.idle;
        const carry = this.model.carry;
        const hold = this.model.hold;

        let moving = this.collector.isStateEquals(States.CARRYING) ?  carry : run;
        let still = this.collector.isStateEquals(States.CARRYING) ?  hold : idle;

        let velX = Math.abs(this.sprite.body.velocity.x);
        if (velX > 16)
            this.sprite.anims.play(moving, true);
        else
            this.sprite.anims.play(still, true);
    }
}
export default ViewCollectorAnim;