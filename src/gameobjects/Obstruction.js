export class Obstacle extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, "obs-rock");

        this.scene = scene;
        this.baseSpeed = 2;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setImmovable(true);
    }

    onmessage = function(e) {
        const obstacle = e.data;
    
        obstacle.x -= obstacle.playerSpeed * 0.01;
    
        if (obstacle.x < -100) {
            obstacle.x = obstacle.screenWidth + 100;
            obstacle.y = Math.random() * (window.innerHeight - 100) + 50;
        }
    
        postMessage(obstacle);
    };    

    update(playerSpeed) {
        this.x -= (2 + playerSpeed * 0.05);

        if (this.x < -this.width) {
            this.x = this.scene.scale.width * 1.5 + Phaser.Math.Between(100, 200);
            this.y = Phaser.Math.Between(50, this.scene.scale.height - 50);
        }
    }
}