import BaseModel from "../consts/BaseModel";

const PlayerModel = Object.assign({}, BaseModel);

PlayerModel.speed = 1;
PlayerModel.relativeSpeed = 1.5;
PlayerModel.atlas = '';
PlayerModel.frame = 'tester';
PlayerModel.animation = "";

export default PlayerModel;