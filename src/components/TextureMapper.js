import Buildings from "../consts/Buildings";
import Decor from "../consts/Decor";

const TextureRegistry = {
    atlas: new Map(),
    getAtlas: (frame) => this.a.atlas.get(frame)    // No idea what 'this.a' is?
}

for (let building in Buildings)
    TextureRegistry.atlas.set(Buildings[building], 'background');

for (let decor in Decor)
    TextureRegistry.atlas.set(Decor[decor], 'background');

export default TextureRegistry;