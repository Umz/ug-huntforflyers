import Building from "../classes/Building";
import Buildings from "../consts/Buildings";
import Decor from "../consts/Decor";
import Depths from "../consts/Depths";
import Forest from "../classes/Forest";
import PlantType from "../consts/PlantType";
import BeeModel from "./BeeModel";
import BlueBirdModel from "./BlueBirdModel";
import RedBirdModel from "./RedBirdModel";

const Stage5Model = {

    LENGTHS: 5,
    ENEMIES: [],
    
    BUILDINGS: [

        Building.New(Decor.FENCE).setTileX(37).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(38).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(39).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(40).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(41).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(42).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(43).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(44).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(45).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(46).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(47).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),
        Building.New(Decor.FENCE).setTileX(48).setDepth(Depths.BUILDINGS_BEHIND).setAlpha(.5),

        Building.New(Buildings.PLAYER_HOUSE).setTileX(42).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.LAB_TABLE).setTileX(40).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.WATER_PUMP).setTileX(46).setDepth(Depths.BUILDINGS_FG),
        Building.New(Decor.POST).setTileX(43).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.HUT).setTileX(10).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.SIGN).setTileX(11).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(10.5).setDepth(Depths.DECOR_FG),

        Building.New(Decor.CHEST).setTileX(24).setDepth(Depths.DECOR_FG),
        Building.New(Decor.WATER).setTileX(25.5).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Buildings.TENT2).setTileX(25).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT2).setTileX(28).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(26.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.TENT3).setTileX(30.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.POD).setTileX(30).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Buildings.LAB_TABLE).setTileX(29).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.CHEST).setTileX(32).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(32.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(33).setDepth(Depths.DECOR_FG),
        Building.New(Decor.HANGING_SIGN).setTileX(34).setDepth(Depths.DECOR_FG),

        Building.New(Decor.BARREL).setTileX(49).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(50).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(51).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(49.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(50.5).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.HUT).setTileX(58).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.SHOP).setTileX(59.5).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.BARREL).setTileX(57.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.PURPLE_CHEST).setTileX(60).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.HUT).setTileX(69).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HUT).setTileX(71).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HOUSE1).setTileX(73).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.CHEST).setTileX(68).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BBQ).setTileX(68.5).setDepth(Depths.DECOR_FG),
        Building.New(Decor.POST).setTileX(70).setDepth(Depths.DECOR_FG),

        Building.New(Decor.FENCE).setTileX(72.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.FENCE).setTileX(73).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.FENCE).setTileX(73.5).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.WATER).setTileX(73.5).setDepth(Depths.BUILDINGS_BEHIND),

        Building.New(Decor.WATER).setTileX(80).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.WATER).setTileX(82).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Buildings.MOSQUE).setTileX(81).setDepth(Depths.BUILDINGS_BG),
        Building.New(Decor.POT).setTileX(82).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BENCH).setTileX(80).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.HOUSE1).setTileX(89).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HUT).setTileX(91).setDepth(Depths.BUILDINGS_BG),
        Building.New(Buildings.HUT).setTileX(93).setDepth(Depths.BUILDINGS_BG),

        Building.New(Decor.BENCH).setTileX(88).setDepth(Depths.DECOR_FG),
        Building.New(Decor.WATER).setTileX(89.5).setDepth(Depths.BUILDINGS_BEHIND),
        Building.New(Decor.POT).setTileX(92).setDepth(Depths.DECOR_FG),
        Building.New(Decor.CHEST).setTileX(94).setDepth(Depths.DECOR_FG),
        Building.New(Decor.BARREL).setTileX(94.5).setDepth(Depths.DECOR_FG),

        Building.New(Buildings.FARMHUT).setTileX(99).setDepth(Depths.BUILDINGS_BG),
    ],

    FORESTS: [

        Forest.New().setTileX(1).setSize(14)
            .addLayer([PlantType.SUNFLOWER], Depths.FOREST_FG2),
        Forest.New().setTileX(1.5).setSize(14)
            .addLayer([PlantType.SUNFLOWER], Depths.FOREST_FG2),

        Forest.New().setTileX(5).setSize(2).setEnemy(BeeModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(16).setSize(4)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_BG3),

        Forest.New().setTileX(55).setSize(2)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(61).setSize(3).setEnemy(BlueBirdModel)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(62).setSize(4)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG1)
            .addLayer([PlantType.TREE1], Depths.FOREST_BG2)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),

        Forest.New().setTileX(75).setSize(2).setEnemy(RedBirdModel)
            .addLayer([PlantType.TREE1], Depths.FOREST_FG1),
        Forest.New().setTileX(85).setSize(2).setEnemy(RedBirdModel)
            .addLayer([PlantType.TREE1], Depths.FOREST_FG1),
        Forest.New().setTileX(95).setSize(3)
            .addLayer([PlantType.TREE1, PlantType.TREE2], Depths.FOREST_FG1),
    ]
}
export default Stage5Model;