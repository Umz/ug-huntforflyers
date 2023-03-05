import Interactions from "../consts/Interactions";
import Dom from "components/Dom";
import GameSave from "./GameSave";
import Dialogue from "../consts/Dialogue";
import Depths from "../consts/Depths";
import Consts from "../consts/Consts";

class Interaction {

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
            case Interactions.TRANSFORM:
                ConvertKin(sprite, data);
            break;
            case Interactions.LEVEL_END:
                nextLevel(sprite, data);
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

function ConvertKin(sprite, data) {

    const scene = sprite.scene;

    sprite.interact = function() {

        let drinkCost = 10;
        const name = "Kin";
        const message = "CARRY!";

        if (GameSave.GetScore() >= drinkCost) {

            GameSave.UpdateScoreAndDom(-drinkCost);
            data.group.add(sprite);

            sprite.setDepth(Depths.PLAYER_TEAM);
            sprite.setKinType(data.type);
            sprite.interactRemove = true;

            Dom.AddChatMessage(name, message);
        }
        else {
            let command = "Buy me a drink for 10cC!";
            let dialogue = Phaser.Utils.Array.GetRandom(Dialogue.NPC.KINS);
            let msg = `${command} ${dialogue}`;
            Dom.AddChatMessage(name, msg);
        }
    }
}

function nextLevel(sprite, data) {
    let scene = sprite.scene;
    sprite.interact = function() {
        if (scene.isAllHousesComplete()) {
            sprite.interactRemove = true;
            scene.saveGameData();
            scene.scene.launch(Consts.LOAD_SCENE, {stageData: data });
        }
    }
}