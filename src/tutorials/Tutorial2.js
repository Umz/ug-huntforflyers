import Tutorial from "../classes/Tutorial";
import Consts from "consts/Consts";
import States from "consts/States";

class Tutorial2 extends Tutorial {

    constructor(scene) {
        super();

        this.addWait(3000)
        .addPrompt("Watch out for thieves.")
        
    }
}
export default Tutorial2;