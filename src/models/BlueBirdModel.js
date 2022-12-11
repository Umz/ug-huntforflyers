import BaseModel from "../consts/BaseModel";
import Animations from "../consts/Animations";

const BlueBirdModel = Object.assign({}, BaseModel);

BlueBirdModel.value = 4;
BlueBirdModel.relativeSpeed = .6;
BlueBirdModel.atlas = 'flyers';
BlueBirdModel.frame = 'bluebird1';
BlueBirdModel.animation = Animations.BLUE_BIRD;

export default BlueBirdModel;