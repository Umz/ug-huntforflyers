import Depths from "consts/Depths";
import PlantType from "consts/PlantType";
import Forest from "classes/Forest";
import Building from "classes/Building";
import Buildings from "consts/Buildings";
import Decor from "consts/Decor";
import BeeModel from "./BeeModel";
import BlueBirdModel from "./BlueBirdModel";

const Stage3Model = {

    LENGTHS: 4,
    ENEMIES: [],
    
    //  80
    BUILDINGS: [
        
        Building.New(Buildings.PLAYER_HOUSE).setTileX(39).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.1),

        Building.New(Decor.WATER).setTileX(9).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.WATER).setTileX(11).setDepth(Depths.BUILDINGS_BEHIND),
        
        Building.New(Buildings.TENT1).setTileX(7).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(8).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(10).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(12).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(13).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.CHEST).setTileX(9).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(9.5).setDepth(Depths.DECOR_FG),

        Building.New(Decor.BENCH).setTileX(17.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BBQ).setTileX(19.5).setDepth(Depths.DECOR_FG),
        Building.New(Buildings.HUT).setTileX(20).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.HANGING_SIGN).setTileX(21).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BENCH).setTileX(23.5).setDepth(Depths.DECOR_FG),

        Building.New(Decor.FENCE).setTileX(27.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.FENCE2).setTileX(28).setDepth(Depths.DECOR_FG),

        Building.New(Decor.FENCE2).setTileX(28).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(29).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(30).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(31).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(32).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(33).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(34).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE2).setTileX(35).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),

        Building.New(Buildings.LAB_TABLE).setTileX(29.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PLAYER_HOUSE).setTileX(32).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.POST).setTileX(33.5).setDepth(Depths.DECOR_FG),
        
        Building.New(Decor.FENCE).setTileX(35.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.FENCE2).setTileX(35).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.WATER_PUMP).setTileX(39).setDepth(Depths.BUILDINGS_FG),

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

        Forest.New().setTileX(0).setSize(2)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),
        Forest.New().setTileX(0).setSize(2)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),

        Forest.New().setTileX(4).setSize(3)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),
        Forest.New().setTileX(4).setSize(3)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),
        Forest.New().setTileX(4).setSize(3)
            .addLayer([PlantType.DRY_GRASS1, PlantType.DRY_GRASS2, PlantType.DRY_GRASS3], Depths.FOREST_FG2),

        Forest.New().setTileX(2).setSize(2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(13).setSize(3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(14).setSize(3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),
        Forest.New().setTileX(14).setSize(3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),
        Forest.New().setTileX(14).setSize(3)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),

        Forest.New().setTileX(17).setSize(6)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),
        Forest.New().setTileX(17).setSize(6).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.BUILDINGS_BEHIND),

        Forest.New().setTileX(24.5).setSize(2)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),
        Forest.New().setTileX(24.5).setSize(2)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),
        Forest.New().setTileX(24.5).setSize(2)
            .addLayer([PlantType.FLOWER1, PlantType.FLOWER2, PlantType.FLOWER3], Depths.FOREST_FG1),

        Forest.New().setTileX(70).setSize(2).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(70).setSize(7)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

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