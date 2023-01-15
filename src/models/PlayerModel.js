import Animations from "consts/Animations";
import BaseModel from "consts/BaseModel";

const PlayerModel = Object.assign({}, BaseModel);

PlayerModel.speed = 1;
PlayerModel.relativeSpeed = 1.5;
PlayerModel.atlas = 'sprites';
PlayerModel.frame = 'spr_tank_run1';
PlayerModel.run = Animations.PLAYER_TANK_RUN;

export default PlayerModel;