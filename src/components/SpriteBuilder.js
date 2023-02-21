import Player from "characters/player/Player";
import Collector from "characters/collector/Collector";
import Civilian from "characters/civilian/Civilian";
import Enemy from "characters/enemy/Enemy";
import Prey from "characters/prey/Prey";
import Depths from "consts/Depths";
import CollectorModel from "models/CollectorModel";
import CivilianModel from "models/CivilianModel";
import PlayerModel from "models/PlayerModel";
import Clone from "../characters/clone/Clone";
import CloneModel from "../models/CloneModel";
import PaleKin from "../characters/palekin/Palekin";
import PaleKinModel from "../models/PaleKinModel";

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

    static GetCloneSprite() {
        return GetSprite(Clone, CloneModel, Depths.CIVILIANS);
    }

    static GetPaleKinSprite() {
        return GetSprite(PaleKin, PaleKinModel, Depths.PLAYER_TEAM);
    }

    static GetPrey(model) {
        return GetSprite(Prey, model, Depths.ENEMIES_SPAWNED);
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