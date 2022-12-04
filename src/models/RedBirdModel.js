import BaseModel from "../consts/BaseModel";
import Animations from "../consts/Animations";

const RedBirdModel = Object.assign({}, BaseModel);

RedBirdModel.speed = .6;
RedBirdModel.relativeSpeed = .7;
RedBirdModel.atlas = 'flyers';
RedBirdModel.frame = 'redbird1';
RedBirdModel.animation = Animations.RED_BIRD;

export default RedBirdModel;