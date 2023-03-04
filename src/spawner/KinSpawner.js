import Buildings from "consts/Buildings";
import States from "consts/States";
import WorldConsts from "consts/WorldConsts";
import SpriteBuilder from "components/SpriteBuilder";
import SpritePhysics from "components/SpritePhysics";
import Interaction from "../components/Interaction";
import Interactions from "../consts/Interactions";
import Buildings from "../consts/Buildings";

class KinSpawner {

    constructor(scene) {
        this.scene = scene;

        this.cks = {
            spawn: Buildings.PLAYER_HOUSE,
            locale: Buildings.LAB_TABLE,
            type: States.MODE_CARRYKIN,
            group: scene.groupCarryKins,
            max: 15,
            current: null
        };

        this.pks = {
            spawn: Buildings.PLAYER_HOUSE,
            locale: Buildings.WATER_PUMP,
            type: States.MODE_PALEKIN,
            group: scene.groupPaleKins,
            max: 7,
            current: null
        };
    }

    update(time, delta) {
        for (let conf of [this.cks, this.pks])
            this.waitToSpawn(conf);
    }

    waitToSpawn(config) {

        let currentActive = this.scene.getGroupActiveCount(config.group);
        if (currentActive < config.max && !config.current) {
            config.current = this.spawnKin(config.spawn, config.locale, config.type, config.group);
        }
        else if (config.current && config.current.getKinType() !== States.MODE_KIN) {
            config.current = null;
        }
    }

    spawnKin(spawnBuilding, localBuilding, kinType, kinGroup) {

        let spawnFrom = this.scene.getBuilding(spawnBuilding);

        let kin = SpriteBuilder.GetKinSprite();
        kin.setPosition(spawnFrom.worldX, WorldConsts.GROUND_Y - 18);

        this.scene.addSpriteToSceneAndGroups(
            kin,
            this.scene.talkingGroup,
            this.scene.spriteUpdateGroup,
            this.scene.platformers,
        );
        SpritePhysics.AddPhysics(kin);

        kin.init(localBuilding);
        kin.setKinSkin();

        let data = { type: kinType, group: kinGroup };
        Interaction.AddInteraction(kin, Interactions.TRANSFORM, data);

        return kin;
    }

    spawnKinType(kinType, group) {

        let player = this.scene.player;

        let kin = SpriteBuilder.GetKinSprite();
        kin.setPosition(player.x - Phaser.Math.Between(16, 32), WorldConsts.GROUND_Y - 16);

        this.scene.addSpriteToSceneAndGroups(
            kin,
            this.scene.spriteUpdateGroup,
            this.scene.platformers,
            group
        );
        SpritePhysics.AddPhysics(kin);

        kin.setKinType(kinType);

        return kin;
    }

    spawnCarryKins(amt) {
        for (let i=0; i < amt; i++)
            this.spawnKinType(States.MODE_CARRYKIN, this.scene.groupCarryKins);
    }

    spawnPaleKins(amt) {
        for (let i=0; i < amt; i++)
            this.spawnKinType(States.MODE_PALEKIN, this.scene.groupPaleKins);
    }
}
export default KinSpawner;