import Buildings from "../consts/Buildings";
import Decor from "../consts/Decor";
import Depths from "../consts/Depths";
import Building from "../classes/Building";
import PlantType from "../consts/PlantType";
import Forest from "../classes/Forest";
import BeeModel from "./BeeModel";

const Stage2Model = {

    LENGTHS: 2,
    TILES: 20,

    ENEMIES: [], 
    
    BUILDINGS: [
        Building.New(Buildings.LAB_TABLE).setTileX(11).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PLAYER_HOUSE).setTileX(12).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WATER_PUMP).setTileX(14).setDepth(Depths.BUILDINGS_FG),

        Building.New(Buildings.HUT).setTileX(29).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.BARREL).setTileX(1).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(1.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(2).setDepth(Depths.DECOR_FG),

        Building.New(Decor.BARREL).setTileX(18).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(18.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(19).setDepth(Depths.DECOR_FG),

        Building.New(Decor.CHEST).setTileX(39).setDepth(Depths.DECOR_FG),

        Building.New(Decor.SIGN).setTileX(7).setDepth(Depths.DECOR_FG),
        Building.New(Decor.SIGN).setTileX(28).setDepth(Depths.DECOR_FG),
    ],
    
    FORESTS: [
        Forest.New().setTileX(3).setSize(3).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(20).setSize(4).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(34).setSize(4).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(20).setSize(14)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
        Forest.New().setTileX(24.5).setSize(10)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
        Forest.New().setTileX(24.2).setSize(10)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
    ]
}
export default Stage2Model;