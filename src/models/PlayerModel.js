import Animations from "consts/Animations";
import BaseModel from "consts/BaseModel";

const PlayerModel = Object.assign({}, BaseModel);

PlayerModel.speed = 1;
PlayerModel.relativeSpeed = 1.5;
PlayerModel.atlas = 'sprites';
PlayerModel.frame = 'spr_tank_hunt_run1';
PlayerModel.run = Animations.PLAYER_HUNT_RUN;

PlayerModel.tankIdle = 'spr_tank_run1';
PlayerModel.huntIdle = 'spr_tank_hunt_run1';
PlayerModel.cannonIdle = 'spr_tank_att_run1';

PlayerModel.tankAnim = Animations.PLAYER_TANK_RUN;
PlayerModel.huntAnim = Animations.PLAYER_HUNT_RUN;
PlayerModel.cannonAnim = Animations.PLAYER_CANNON_RUN;

export default PlayerModel;