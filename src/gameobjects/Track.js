export class Track extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.speed = 5;

        this.createTrack();

        scene.add.existing(this);
    }

    createTrack() {
        const trackWidth = this.scene.scale.width * 2;
        const trackHeight = 200;

        this.track1 = this.scene.add.tileSprite(0, 0, trackWidth, trackHeight, 'floor').setOrigin(0, 0);
        
        this.add(this.track1);
        this.setY(this.scene.scale.height - trackHeight);
    }
    
    onmessage = function(e) {
        const speed = e.data.speed;
    
        postMessage({ speed });
    };    

    update(playerSpeed) {
        this.track1.tilePositionX += playerSpeed * 0.1;
    }

    update() {
        this.track1.tilePositionX += this.speed;
    }

    setSpeed(speed) {
        this.speed = speed;
    }
}