import Building from "classes/Building";
import Forest from "classes/Forest";
import Buildings from "consts/Buildings";
import Decor from "consts/Decor";
import Depths from "consts/Depths";
import PlantType from "consts/PlantType";
import Characters from 'consts/Characters';
import BeeModel from "./BeeModel";
import Tutorial2 from "../tutorials/Tutorial2";
import Signage from "../consts/Signage";
import Levels from "../consts/Levels";

const Stage2Model = {

    LENGTHS: 2,
    CARRYKINS: 2,
    TUTORIAL: Tutorial2,
    ENEMIES: [
        Characters.DRONE
    ],
    
    BUILDINGS: [

        Building.New(Buildings.TENT1).setTileX(7.5).setDepth(Depths.BUILDINGS_BG).setComplete(1),
        Building.New(Buildings.TENT2).setTileX(9).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.SIGN).setTileX(10).setDepth(Depths.BUILDINGS_BG).setSign(Signage.LV2_LEFT),
        
        Building.New(Decor.BARREL).setTileX(10.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(11).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(11.5).setDepth(Depths.DECOR_FG),
        
        Building.New(Buildings.LAB_TABLE).setTileX(14).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.POD).setTileX(16).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.PLAYER_HOUSE).setTileX(17).setDepth(Depths.BUILDINGS_BG).setLevelEnd(Levels.STAGE3),
        Building.New(Buildings.WATER_PUMP).setTileX(19).setDepth(Depths.BUILDINGS_FG),

        Building.New(Buildings.TENT1).setTileX(22).setDepth(Depths.BUILDINGS_BG).setComplete(1),
        Building.New(Buildings.TENT2).setTileX(23).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(25).setDepth(Depths.BUILDINGS_BG).setCivs(2),
        Building.New(Decor.SIGN).setTileX(30).setDepth(Depths.BUILDINGS_BG).setSign(Signage.LV2_RIGHT),
    ],
    
    FORESTS: [

        Forest.New().setTileX(0).setSize(6)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),
        Forest.New().setTileX(.5).setSize(6)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),

        Forest.New().setTileX(4).setSize(3).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(24).setSize(6).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(26).setSize(3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(34).setSize(1).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(35).setSize(5)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(28).setSize(7)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
        Forest.New().setTileX(28).setSize(7)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
        Forest.New().setTileX(28.5).setSize(7)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
    ]
}
export default Stage2Model;