import Interactions from "../consts/Interactions";
import Dom from "components/Dom";
import GameSave from "./GameSave";
import Dialogue from "../consts/Dialogue";

class Interaction {

    // Swap level
    // Spawn enemy

    static AddInteraction(sprite, type, data) {
        switch (type) {
            case Interactions.SIGN:
                AddSignInteraction(sprite, data);
            break;
            case Interactions.POST:
                AddMessageList(sprite, data);
            break;
            case Interactions.GRAVE:
                AddGraveDisplay(sprite);
            break;
            case Interactions.PALEKIN:
                ConvertToPaleKin(sprite);
            break;
        }
    }
}
export default Interaction;

function AddSignInteraction(sprite, chat) {
    sprite.interact = function() {
        Dom.AddChatMessage(chat.name, chat.message, chat.className);
        sprite.interactIcon = 'ic_speech';
    }
}

function AddMessageList(sprite, chat) {
    sprite.interact = function() {
        let message = chat.getNextMessageOrNull();
        if (message) {
            Dom.AddChatMessage(chat.name, message, chat.className);
            sprite.interactIcon = 'ic_speech';
        }
    }
}

function AddGraveDisplay(sprite, data) {
    sprite.interact = function() {
        sprite.scene.stopGameControls();
        sprite.scene.showGravestoneStats(this);
        sprite.interactIcon = 'ic_speech';
    }
}

function ConvertToPaleKin(sprite, data) {
    sprite.interact = function() {
        let drinkCost = 10;
        const name = "Kin";
        if (GameSave.GetScore() > drinkCost) {
            GameSave.UpdateScoreAndDom(-drinkCost);
            sprite.setPaleKin();
            sprite.interactRemove = true;
            Dom.AddChatMessage(name, 'CARRY!');
        }
        else {
            let command = "Buy me a drink for 10cC!";
            let dialogue = Phaser.Utils.Array.GetRandom(Dialogue.NPC.KINS);
            let msg = `${command} ${dialogue}`;
            Dom.AddChatMessage(name, msg);
        }
    }
}