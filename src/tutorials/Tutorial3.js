import Tutorial from "../classes/Tutorial";
import Consts from "consts/Consts";
import States from "consts/States";

class Tutorial3 extends Tutorial {

    constructor(scene) {
        super();

        //  CarryKins 

        this.addWait(3000)
        .addPrompt("The fertile land has been expanded once again.")
        .addWait(1000)
        .addPrompt("Continue collecting 'material' and 'currency' for construction")
        .addListener(()=>{
            return scene.getCoinerCount() > 0;
        })
        .addPrompt("Pips are dirty little 'currency' thieves that dig up from below. Run over them in TANK mode", Consts.CHATBOX_TUT_COMMAND)
        .addListener(()=>{
            return scene.getCoinerCount() === 0;
        })
        .addPrompt("Good. Competent", Consts.CHATBOX_TUT_SUCCESS)
        .addWait(5000)
        .addPrompt("Note: You can read signs, board, letters and interact with the world using the UP button... If you want to")
    }
}
export default Tutorial3;