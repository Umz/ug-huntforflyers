import Consts from "consts/Consts";
import GameSave from "components/GameSave";
import Dom from "components/Dom";

class Tutorial {

    constructor() {

        this.allTutorialSteps = [];
        this.stepsTotal = 0;
        this.stepsIndex = 0;

        this.counter = 0;
    }

    update(time, delta) {

        if (this.stepsIndex < this.stepsTotal) {
            let current = this.allTutorialSteps[this.stepsIndex];
            if (current(time, delta))
                this.nextStep();
        }
    }

    isTutorialComplete() {
        return this.stepsIndex >= this.stepsTotal;
    }

    nextStep() {
        this.stepsIndex ++;
        this.resetValues();
    }

    resetValues() {
        this.counter = 0;
    }

    addPrompt(message, className = Consts.CHATBOX_TUTORIAL) {
        AddStep(this, ()=>{
            let name = "Guide";
            Dom.AddChatMessage(name, message, className);
            return true;
        });
        return this;
    }

    addBonusCurrency(amt) {
        AddStep(this, ()=>{
            GameSave.IncScore(amt);
            Dom.SetDomText(Consts.UI_SCORE_TEXT, GameSave.GetScore());
            return true;
        });
        return this;
    }

    addWait(waitTime) {
        AddStep(this, (time, delta)=>{
            this.counter += delta;
            return this.counter >= waitTime;
        });
        return this;
    }

    addListener(fn) {
        AddStep(this, fn);
        return this;
    }

    addAction(fn) {
        AddStep(this, ()=>{
            fn();
            return true;
        });
        return this;
    }
}

function AddStep(tutorial, fn) {
    tutorial.allTutorialSteps.push(fn);
    tutorial.stepsTotal = tutorial.allTutorialSteps.length;
}

export default Tutorial;