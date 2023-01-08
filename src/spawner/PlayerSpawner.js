import Buildings from "consts/Buildings";
import States from "consts/States";
import WorldConsts from "consts/WorldConsts";
import Player from "characters/player/Player";
import Collector from "characters/collector/Collector";

class PlayerSpawner {
    
    constructor(scene) {
        this.scene = scene;
    }

    spawnPlayer() {

        let home = this.scene.getBuilding(Buildings.PLAYER_HOUSE);

        let player = new Player(this.scene)
        player.init();
        player.setPosition(home.worldX, WorldConsts.GROUND_Y - 32);
        player.setState(States.HUNTING);
        player.updateCollision();

        this.scene.addPlayerToGroups(player.getSprite());
        this.scene.addGroundPhysics(player.getSprite());
        this.scene.addPlayerControls(player);

        return player;
    }

    spawnCollector() {

        let col = new Collector(this.scene);
        col.init();
        col.setPosition(this.scene.player.x, WorldConsts.GROUND_Y - 32);

        this.scene.addCollectorToGroups(col.getSprite());
        this.scene.addGroundPhysics(col.getSprite());

        col.setTrackedSprite(this.scene.player.getSprite());

        return col;
    }

}
export default PlayerSpawner;