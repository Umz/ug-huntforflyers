import Tutorial from "../classes/Tutorial";
import Consts from "consts/Consts";
import States from "consts/States";
import GameSave from "../components/GameSave";

class Tutorial1 extends Tutorial {

    constructor(scene) {
        super();

        this.addWait(1000)
        .addPrompt("Welcome to the Dwelling. The fertile land is small for now, but you will expand and grow it")
        .addWait(1000)
        .addPrompt("Now get straight into it! You need to collect 'material' to create 'currency'")
        .addWait(3000)
        .addPrompt("Use the action button while in HUNT mode to 'freeze' some bees to create 'material'", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.countFrozen() > 0;
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(3000)
        .addPrompt("Now use the down button to change into TANK mode", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.player.isState(States.MODE_TANK);
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(3000)
        .addPrompt("Now push the 'material' into the water tank and collect the 'currency' that is produced", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            //return scene.coinGroup.countActive() > 0;
            return GameSave.GetScore() > 0;
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(3000)
        .addPrompt("The Farborne will use any 'currency' you collect for construction")
        .addWait(2000)
        .addPrompt("So.. keep collecting until all construction is complete. Here is some 'currency' to help")
        .addWait(2000)
        .addAction(()=>{
            for (let i=0; i<5; i++)
                scene.addCoin(3);
        });
    }
}
export default Tutorial1;