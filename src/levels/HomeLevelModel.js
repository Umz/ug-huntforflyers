import Buildings from "../consts/Buildings.";
import Depths from "../consts/Depths";
import Flora from "../consts/Flora";
import Building from "../classes/Building";

const HomeLevelModel = {

    LENGTHS: 1,     //  1 Length is 1 screen
    TILES: 20,      //  How many tiles in 1 length
    
    BUILDINGS: [
        new Building({type:Buildings.LAB_TABLE, tile:4, depth:Depths.BUILDINGS_BG}),
        new Building({type:Buildings.PLAYER_HOUSE, tile:6, depth:Depths.BUILDINGS_BG}),
        new Building({type:Buildings.WATER_PUMP, tile:8, depth:Depths.BUILDINGS_FG})
    ],

    FORESTS: [
        {type: Flora.SIMPLE_FOREST, tile:14, size:4}
    ]
}
export default HomeLevelModel;