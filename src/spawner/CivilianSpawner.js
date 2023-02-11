import WorldConsts from "consts/WorldConsts";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";
import Interaction from "../components/Interaction";
import Interactions from "../consts/Interactions";
import Chat from '../classes/Chat';
import Dialogue from "../consts/Dialogue";
import Buildings from "../consts/Buildings";

class CivilianSpawner {
    
    constructor(scene) {
        this.scene = scene;
        this.setupDialogue();
    }

    spawnCivilian(house) {

        let civ = SpriteBuilder.GetCivilianSprite();
        civ.setPosition(house.x, WorldConsts.GROUND_Y - 20);

        this.scene.addSpriteToSceneAndGroups(
            civ,
            this.scene.spriteUpdateGroup,
            this.scene.collisionGroupCivilians
        );
        SpritePhysics.AddPhysics(civ);

        civ.setHome(house);

        civ.setGender(Math.random() > .8);

        let dialogues = this.chats.get(house.getType());
        if (dialogues && dialogues.length > 0) {

            let name = civ.isMale ? this.getMaleName() : this.getFemaleName();
            let list = dialogues.shift();
            let className = Dialogue.TYPE_CIV;
            let chat = new Chat(name, list, className);
            Interaction.AddInteraction(civ, Interactions.POST, chat);

            this.scene.addSpriteToSceneAndGroups(
                civ,
                this.scene.talkingGroup
            );
        }
    }

    setupDialogue() {

        let fileChats = new Map();
        this.assignDialogueToBuildings(fileChats);
        
        let chatCopy = new Map(JSON.parse(JSON.stringify(Array.from(fileChats))));
        this.chats = chatCopy;
    }

    assignDialogueToBuildings(map) {
        
        map.set(Buildings.TENT1, Dialogue.NPC.TENT1);
        map.set(Buildings.TENT2, Dialogue.NPC.TENT2);
        map.set(Buildings.TENT3, Dialogue.NPC.TENT3);
        
        map.set(Buildings.HUT, Dialogue.NPC.HUT);
        map.set(Buildings.HOUSE1, Dialogue.NPC.HOUSE1);
        map.set(Buildings.HOUSE2, Dialogue.NPC.HOUSE2);
        
        /*
        map.set(Buildings.LAB_TABLE, Dialogue.HUT);
        map.set(Buildings.PLAYER_HOUSE, Dialogue.HUT);
        map.set(Buildings.FARMHUT, Dialogue.HUT);
        map.set(Buildings.MOSQUE, Dialogue.HUT);
        
        map.set(Buildings.PUB, Dialogue.HUT);
        map.set(Buildings.SHOP, Dialogue.HUT);
        map.set(Buildings.STORE, Dialogue.HUT);
        map.set(Buildings.RESTAURANT, Dialogue.HUT);

        map.set(Buildings.RANCH, Dialogue.HUT);
        map.set(Buildings.WINDMILL, Dialogue.HUT);
        */
    }

    getMaleName(isFemale = false) {

        const c1 = 'ADFGKMPQTVZ';
        const c2 = 'AEIOU';
        const c3 = 'GHJNESVXYZ';

        let l1 = Phaser.Utils.Array.GetRandom(c1.split(""));
        let l2 = Phaser.Utils.Array.GetRandom(c2.split(""));
        let l3 = Phaser.Utils.Array.GetRandom(c2.split(""));
        let l4 = Phaser.Utils.Array.GetRandom(c3.split(""));

        let name = l2 + l1 + l3 + l4 + l4;
        return name;
    }

    getFemaleName() {

        const c1 = 'ADFKPQVZ';
        const c2 = 'AEIOU';
        const c3 = 'BCHJLNRSTVWXYZ';
        const femEnds = "A-AH-YA-OA-IA"

        let l1 = Phaser.Utils.Array.GetRandom(c1.split(""));
        let l2 = Phaser.Utils.Array.GetRandom(c2.split(""));
        let l3 = Phaser.Utils.Array.GetRandom(c2.split(""));
        let l4 = Phaser.Utils.Array.GetRandom(c3.split(""));
        let l5 = Phaser.Utils.Array.GetRandom(femEnds.split("-"));

        let name = l1 + l2 + l3 + l4 + l5;
        return name;
    }
}
export default CivilianSpawner;