class House extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.completion = 1;
        this.capacity = 100;
        this.filled = 100;
    }

    setConfig(config) {
        this.config = config;
        return this;
    }

    setScaffold() {

    }

    setCompletePercentAndCrop(val) {
        this.completion = val;
        this.setCropToCompletion();
    }

    setCropToCompletion() {

        let fullHeight = this.height;
        let cropHeight = this.completion * fullHeight;
        let cropY = fullHeight - cropHeight;

        this.setCrop(0, cropY, this.width, cropHeight);
    }
    
    getType() {
        return this.config.type;
    }
}
export default House;