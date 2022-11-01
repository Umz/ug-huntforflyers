class Flyerviewer {

    constructor(prey) {
        
        this.prey = prey;
        this.sprite = prey.sprite;

        this.addFlappingAnimation();
    }

    addFlappingAnimation() {
        let timer = 500;
        let count = 1;
        const fn = function(time, delta) {
            timer -= delta;
            if (timer <= 0) {
                count = (count + 1) > 4 ? 1 : (count + 1);
                timer = 60;
                this.setTexture(`fairy${count}`);
            }
        }
        this.prey.addUpdater(fn.bind(this.sprite));
    }
}   
export default Flyerviewer;