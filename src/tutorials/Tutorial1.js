import Tutorial from "../classes/Tutorial";
import Consts from "consts/Consts";
import States from "consts/States";

class Tutorial1 extends Tutorial {

    constructor(scene) {
        super();

        this.addWait(3000)
        .addPrompt("Let's jump straight into it! You need to collect 'material' to create 'currency'\nThe details do not matter")
        .addWait(3000)
        .addPrompt("Use the action button while in HUNT mode to 'freeze' some bees", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.countFrozen() > 0;
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(1000)
        .addPrompt("Use the down button to change into TANK mode", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.player.isState(States.MODE_TANK);
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(1000)
        .addPrompt("Now go and push the 'material' into the water tank and collect the 'currency' that is produced", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.coinGroup.countActive() > 0;
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(2000)
        .addPrompt("The Farborne will use any 'currency' you collect for land development")
        .addWait(5000)
        .addPrompt("So.. keep collecting until development is complete. Here is some more to help")
        .addWait(4000)
        .addAction(()=>{
            for (let i=0; i<5; i++)
                scene.addCoin(3);
        });
    }
}
export default Tutorial1;