import Depths from "../consts/Depths";
import PlantType from "../consts/PlantType";
import Forest from "../classes/Forest";
import BeeModel from "./BeeModel";
import BlueBirdModel from "./BlueBirdModel";
import Building from "../classes/Building";
import Buildings from "../consts/Buildings";
import Decor from "../consts/Decor";

const Stage3Model = {

    LENGTHS: 4,
    ENEMIES: [],
    
    //  80
    BUILDINGS: [
        Building.New(Buildings.PLAYER_HOUSE).setTileX(32).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.LAB_TABLE).setTileX(30).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WATER_PUMP).setTileX(36).setDepth(Depths.BUILDINGS_FG),
        Building.New(Decor.POST).setTileX(33).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.HUT).setTileX(6).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.SIGN).setTileX(8).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(9).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(9.5).setDepth(Depths.DECOR_FG),

        Building.New(Decor.HANGING_SIGN).setTileX(25).setDepth(Depths.DECOR_FG),
        Building.New(Decor.FENCE).setTileX(26).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.FENCE).setTileX(26.5).setDepth(Depths.BUILDINGS_BG).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(27).setDepth(Depths.DECOR_FG),

        Building.New(Decor.FENCE).setTileX(27).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(28).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(29).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(30).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(31).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(32).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(33).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(34).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(35).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(36).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),

        Building.New(Decor.FENCE).setTileX(37).setDepth(Depths.DECOR_FG),
        Building.New(Decor.FENCE).setTileX(37.5).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(38).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.TENT1).setTileX(51).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT2).setTileX(52.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.BARREL).setTileX(49.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(50).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(50.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(53.5).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.TENT3).setTileX(58).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HUT).setTileX(61).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(63).setDepth(Depths.BUILDINGS_BG),
        
        Building.New(Decor.CHEST).setTileX(59).setDepth(Depths.DECOR_FG),
        Building.New(Decor.HANGING_SIGN).setTileX(60).setDepth(Depths.DECOR_FG),
        Building.New(Decor.WATER).setTileX(63.5).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.POT).setTileX(61.5).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.TENT2).setTileX(68.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(70).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT2).setTileX(73).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(74).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.BARREL).setTileX(67.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(68).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(71).setDepth(Depths.DECOR_FG),

        Building.New(Decor.CHEST).setTileX(74.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.SIGN).setTileX(76).setDepth(Depths.DECOR_FG),
    ],

    FORESTS: [
        Forest.New().setTileX(0).setSize(4)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(12).setSize(2).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(13).setSize(7)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(5).setSize(10)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),
        Forest.New().setTileX(4.5).setSize(10)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG2),

        Forest.New().setTileX(45).setSize(2).setEnemy(BlueBirdModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(55).setSize(2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(65).setSize(2).setEnemy(BlueBirdModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(78).setSize(2)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG2),
    ]
}
export default Stage3Model;