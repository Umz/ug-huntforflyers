import Depths from "consts/Depths";
import PlantType from "consts/PlantType";
import Forest from "classes/Forest";
import Building from "classes/Building";
import Buildings from "consts/Buildings";
import Decor from "consts/Decor";
import BeeModel from "./BeeModel";
import BlueBirdModel from "./BlueBirdModel";
import Characters from "consts/Characters";

const Stage3Model = {

    LENGTHS: 4,
    ENEMIES: [
        Characters.DRONE,
        Characters.BOMBER,
        Characters.PIP
    ],
    
    //  80
    BUILDINGS: [
        
        Building.New(Decor.WATER).setTileX(9).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.WATER).setTileX(11).setDepth(Depths.BUILDINGS_BEHIND),
        
        Building.New(Buildings.TENT1).setTileX(7).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT1).setTileX(8).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(10).setDepth(Depths.BUILDINGS_BG).setComplete(1),
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

        Building.New(Decor.WATER).setTileX(38).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.WATER).setTileX(39).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.WATER).setTileX(40).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Buildings.WATER_PUMP).setTileX(39).setDepth(Depths.BUILDINGS_FG),

        Building.New(Decor.BARREL).setTileX(39.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(40.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(41).setDepth(Depths.DECOR_FG),

        Building.New(Decor.POD).setTileX(47).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.PUB).setTileX(48).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.CHEST).setTileX(47).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(49).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(49.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.HANGING_SIGN).setTileX(50).setDepth(Depths.DECOR_FG),

        Building.New(Decor.BENCH).setTileX(51.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.BENCH).setTileX(52).setDepth(Depths.BUILDINGS_BG),

        Building.New(Buildings.HOUSE1).setTileX(59).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(60.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT2).setTileX(62.5).setDepth(Depths.BUILDINGS_BG),
        
        Building.New(Decor.FENCE2).setTileX(58.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.WATER).setTileX(61).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.CHEST).setTileX(61.5).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.TENT3).setTileX(67).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(68.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(70).setDepth(Depths.BUILDINGS_BG).setComplete(1),

        Building.New(Decor.BARREL).setTileX(67).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(67.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.WATER).setTileX(68).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.WATER).setTileX(69.5).setDepth(Depths.BUILDINGS_BEHIND),

        Building.New(Decor.SIGN).setTileX(72).setDepth(Depths.DECOR_FG),
        Building.New(Decor.SIGN).setTileX(75).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.SIGN).setTileX(78).setDepth(Depths.DECOR_FG),
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

        Forest.New().setTileX(42).setSize(7)
            .addLayer([PlantType.BUSH], Depths.FOREST_BG1)
            .addLayer([PlantType.BUSH], Depths.FOREST_BG2)
            .addLayer([PlantType.BUSH], Depths.FOREST_BG3)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG1),

        Forest.New().setTileX(45).setSize(2).setEnemy(BlueBirdModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(53).setSize(4)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
        Forest.New().setTileX(56).setSize(5)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(61).setSize(6)
            .addLayer([PlantType.BUSH], Depths.FOREST_BG3)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG1),

        Forest.New().setTileX(64).setSize(2).setEnemy(BlueBirdModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(78).setSize(2)
            .addLayer([PlantType.BUSH], Depths.FOREST_FG2),
    ]
}
export default Stage3Model;