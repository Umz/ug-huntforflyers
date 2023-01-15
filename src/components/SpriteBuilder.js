import Player from "characters/player/Player";
import Collector from "characters/collector/Collector";
import Civilian from "characters/civilian/Civilian";
import Enemy from "characters/enemy/Enemy";
import Depths from "consts/Depths";
import CollectorModel from "models/CollectorModel";
import CivilianModel from "models/CivilianModel";
import PlayerModel from "models/PlayerModel";

class SpriteBuilder {

    static GetPlayerSprite(scene, model) {
        return GetSprite(Player, PlayerModel, Depths.PLAYERS);
    }

    static GetCollectorSprite() {
        return GetSprite(Collector, CollectorModel, Depths.PLAYER_TEAM);
    }

    static GetCivilianSprite() {
        return GetSprite(Civilian, CivilianModel, Depths.CIVILIANS);
    }

    static GetFlyingEnemySprite(scene, model) {
        let sprite = scene.physics.add.sprite(-100, -100, model.atlas, model.frame).setDepth(Depths.ENEMIES_SPAWNED);
        return sprite;
    }

    static GetEnemy(model) {
        return GetSprite(Enemy, model, Depths.ENEMIES);
    }
}
export default SpriteBuilder;

//  #   INTERNAL use

function GetSprite(ClassType, model, depth) {
    let sprite = new ClassType(SpriteBuilder.scene, -100, -100, model.atlas, model.frame);
    sprite.setDepth(depth);
    return sprite;
}