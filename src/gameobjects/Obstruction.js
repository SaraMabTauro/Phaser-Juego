export class Obstacle extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, "obs-rock");

        this.scene = scene;
        this.baseSpeed = 2;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setImmovable(true);
    }

    update(playerSpeed) {
        // Hace que el obstáculo se mueva de derecha a izquierda
        this.x -= (2 + playerSpeed * 0.05);  // Ajusta la velocidad del obstáculo basado en la velocidad del jugador

        // Si el obstáculo sale de la pantalla, lo reposicionamos en la derecha
        if (this.x < -this.width) {
            this.x = this.scene.scale.width * 1.5 + Phaser.Math.Between(100, 200);
            this.y = Phaser.Math.Between(50, this.scene.scale.height - 50);
        }
    }
}