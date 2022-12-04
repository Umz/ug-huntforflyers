import BaseModel from "../consts/BaseModel";
import Animations from "../consts/Animations";

const FairyModel = Object.assign({}, BaseModel);

FairyModel.speed = .6;
FairyModel.relativeSpeed = .3;
FairyModel.atlas = 'flyers';
FairyModel.frame = 'fairy1';
FairyModel.animation = Animations.FAIRY;

export default FairyModel;