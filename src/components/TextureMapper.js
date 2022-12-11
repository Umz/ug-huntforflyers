import Buildings from "../consts/Buildings";
import Decor from "../consts/Decor";
import PlantType from "../consts/PlantType";

const TextureRegistry = {
    atlas: new Map(),
    getAtlas: (frame) => this.a.atlas.get(frame)    // No idea what 'this.a' is?
}

for (let building in Buildings)
    TextureRegistry.atlas.set(Buildings[building], 'background');

for (let decor in Decor)
    TextureRegistry.atlas.set(Decor[decor], 'background');

for (plant in PlantType)
    TextureRegistry.atlas.set(PlantType[plant], 'background');

export default TextureRegistry;