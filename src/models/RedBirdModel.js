import BaseModel from "../consts/BaseModel";
import Animations from "../consts/Animations";

const RedBirdModel = Object.assign({}, BaseModel);

RedBirdModel.value = 8;
RedBirdModel.speed = .6;
RedBirdModel.relativeSpeed = .7;
RedBirdModel.atlas = 'flyers';
RedBirdModel.frame = 'redbird1';
RedBirdModel.animation = Animations.RED_BIRD;
RedBirdModel.tint = 0xc40c0c;

export default RedBirdModel;