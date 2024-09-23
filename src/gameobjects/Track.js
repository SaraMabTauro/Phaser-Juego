export class Track extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.speed = 5;

        this.createTrack();

        scene.add.existing(this);
    }

    createTrack() {
        const trackWidth = this.scene.scale.width * 2; // Aumentamos el ancho
        const trackHeight = 200;

        this.track1 = this.scene.add.tileSprite(0, 0, trackWidth, trackHeight, 'floor').setOrigin(0, 0);
        
        this.add(this.track1);
        this.setY(this.scene.scale.height - trackHeight);
    }

    update(playerSpeed) {
        // Usamos la velocidad del jugador para mover el tileSprite
        this.track1.tilePositionX += playerSpeed * 0.1;
    }

    update() {
        // Desplazamiento horizontal del tileSprite basado en la velocidad
        this.track1.tilePositionX += this.speed;
    }

    setSpeed(speed) {
        // Cambiar la velocidad de la pista según el auto
        this.speed = speed;
    }
}