import Animations from "consts/Animations";
import BaseModel from "consts/BaseModel";

const CoinerModel = Object.assign({}, BaseModel);

CoinerModel.relativeSpeed = .8;
CoinerModel.atlas = 'sprites';
CoinerModel.frame = 'coiner1';

CoinerModel.run = Animations.COINER_RUN;

export default CoinerModel;