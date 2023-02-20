import Tutorial from "../classes/Tutorial";
import Consts from "consts/Consts";
import States from "consts/States";

class Tutorial4 extends Tutorial {

    constructor(scene) {
        super();

        // PaleKins

        this.addWait(3000)
        .addPrompt("Your work here is great. The land is ever improving, but now your enemies will attack in earnest. Have your cannons ready at all times")
        .addWait(5000)
        .addPrompt("As you can see there are many more civilians too, so you will need to collect much more 'currency' to house them all")
        .addListener(()=>{
            return scene.getGroupActiveCount(scene.collisionGroupSkyBombers) > 0;
        })
        .addPrompt("Caution! Drones will drop bombs on you. Destroy them first with your CANNON", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.getGroupActiveCount(scene.collisionGroupSkyBombers) === 0;
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(5000)
        .addPrompt("Birds are worth more than bees when 'frozen' into 'material'. You will need as many as available")
        .addListener(()=>{
            return scene.getGroupActiveCount(scene.collisionGroupSkyBombers) > 0;
        })
        .addPrompt("Drone! Blast it out of the sky", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.getGroupActiveCount(scene.collisionGroupSkyBombers) === 0;
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(15000)
        .addPrompt("You will likely lose many CarryKins as your enemies grow in number and strength. Fear not. At The Drinking Spot, there is an ever replenishing supply of CarryKins")
        .addWait(5000)
        .addPrompt("Just give any Kin that asks a drink and you will gain a loyal CarryKin. It will only cost you 10 'currency' to make the drink")
    }
}
export default Tutorial4;