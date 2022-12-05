import BaseModel from "../consts/BaseModel";
import Animations from "../consts/Animations";

const BatModel = Object.assign({}, BaseModel);

BatModel.relativeSpeed = .5;
BatModel.value = 5;
BatModel.atlas = 'flyers';
BatModel.frame = 'bat1';
BatModel.animation = Animations.BAT;

export default BatModel;