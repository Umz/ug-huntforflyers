import Tutorial from "../classes/Tutorial";
import Consts from "consts/Consts";
import States from "consts/States";

class Tutorial2 extends Tutorial {

    constructor(scene) {
        super();

        this.addWait(3000)
        .addPrompt("The fertile land has been expanded. Now called the Locale of Bees where honey is abundant.")
        .addWait(3000)
        .addPrompt("And experiments have proven sucessful. You now have some CarryKins to help you collect 'material'")
        .addListener(()=>{
            return scene.getThiefCount() > 0;
        })
        .addWait(1000)
        .addPrompt("Look, your enemies have come to steal 'material' from you. Use CANNON mode to destroy the Drones", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.track.killCount >= 3 || scene.getThiefCount() === 0;
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addListener(()=>{
            return scene.getThiefCount() > 0;
        })
        .addWait(1000)
        .addPrompt("Again! Use CANNON mode to destroy them", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.track.killCount >= 3 || scene.getThiefCount() === 0;
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(3000)
        .addPrompt("Keep collecting 'material' and 'currency' until construction is complete. Destroy every Drone that appears")
    }
}
export default Tutorial2;