import BaseModel from "../consts/BaseModel";
import Animations from "../consts/Animations";

const BugModel = Object.assign({}, BaseModel);

BugModel.relativeSpeed = .8;
BugModel.value = 2;
BugModel.atlas = 'flyers';
BugModel.frame = 'bug1';
BugModel.animation = Animations.BUG;
BugModel.tint = 0x228c05;

export default BugModel;