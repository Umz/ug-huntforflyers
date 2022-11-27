class PreySpawner {

    constructor() {
    }

    //  Conditions for the call -?
    //  Event based? Time based?
    //  Internal? Listen for spawn event?
    //  Player gets close to bushes? No other prey?
    //  Cooldown before the next event
    //  Differnet spawner per location or ? 
    
    addPreyToScene() {

        let prey = new Prey(this);
        
        this.allUpdaters.add(prey.sprite);
        this.collisionGroupEnemies.add(prey.sprite);

        SpriteGenerator.addFlightPhysics(prey.sprite);

        prey.init();
    }

}
export default PreySpawner;