import BaseController from "classes/BaseController";
import ViewDirection from "actions/ViewDirection";
import ViewRunIdle from "actions/ViewRunIdle";
import PaleKinModel from "models/PaleKinModel";

class PaleKinView extends BaseController {

    constructor(sprite) {
        super(sprite);
        this.addDirectionTracking();
        this.addAnimationListener();
    }
    
    addDirectionTracking() {
        this.addAction(new ViewDirection(this.sprite));
    }

    addAnimationListener() {
        this.addAction(new ViewRunIdle(this.sprite));
    }

    setSkin() {

        this.clearAllActions();

        this.sprite.model = Object.assign({}, PaleKinModel);
        this.sprite.flash(0xFFFFFF, 700);

        this.scene.add.tween({
            targets: this.sprite,
            duration: 300,
            scaleX: {from:1, to:2},
            scaleY: {from:1, to:2},
            yoyo: true,
            onComplete:()=>{

                let model = this.sprite.model;
                let textureFrame = this.scene.textures.getFrame('sprites', model.frame);

                this.sprite.setFrame(model.frame);
                this.sprite.setSize(textureFrame.width, textureFrame.height);
                this.sprite.refreshBody();

                this.addDirectionTracking();
                this.addAnimationListener();
            }
        });
    }
}
export default PaleKinView;