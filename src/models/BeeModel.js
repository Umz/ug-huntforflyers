import BaseModel from "../consts/BaseModel";
import Animations from "../consts/Animations";

const BeeModel = Object.assign({}, BaseModel);

BeeModel.relativeSpeed = .9;
BeeModel.value = 2;
BeeModel.atlas = 'flyers';
BeeModel.frame = 'bee1';
BeeModel.animation = Animations.BEE;

export default BeeModel;