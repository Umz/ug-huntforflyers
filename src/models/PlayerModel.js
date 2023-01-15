import BaseModel from "../consts/BaseModel";

const PlayerModel = Object.assign({}, BaseModel);

PlayerModel.speed = 1;
PlayerModel.relativeSpeed = 1.5;
PlayerModel.atlas = 'sprites';
PlayerModel.frame = 'spr_droid_idle2';
PlayerModel.animation = "";

export default PlayerModel;