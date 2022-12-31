import Animations from "../consts/Animations";
import BaseModel from "../consts/BaseModel";

const ThiefModel = Object.assign({}, BaseModel);

ThiefModel.relativeSpeed = 1;
ThiefModel.atlas = 'sprites';
ThiefModel.frame = 'thief1';

ThiefModel.idle = Animations.THIEF_FLY;

export default ThiefModel;