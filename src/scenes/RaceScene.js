import { Car } from '../gameobjects/Car.js';
import { Obstacle } from '../gameobjects/Obstruction.js';
import { Track } from '../gameobjects/Track.js';

export class RaceScene extends Phaser.Scene {
    constructor() {
        super("RaceScene");
    }

    create() {
        this.add.image(0, 0, "background").setOrigin(0, 0).setScrollFactor(0);

        this.track = new Track(this, 0, 0);
        this.player = new Car(this, 100, this.scale.height / 2, 'carrito');
        this.obstacle = new Obstacle(this, this.scale.width + 100, Phaser.Math.Between(50, this.scale.height - 50));

        
        this.cursors = this.input.keyboard.createCursorKeys();//detecta las teclas
        
        //colisión entre carro y obstáculo
        this.physics.add.collider(this.player, this.obstacle, this.gameOver, null, this);
        
        this.player.start();
        
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, this.scale.height);

        this.scene.launch("HudScene");

        this.time.delayedCall(60000, this.gameOver, [], this);

        //suma de los puntos
        this.points = 0;
        this.time.addEvent({
            delay: 1000,
            callback: this.updatePoints,
            callbackScope: this,
            loop: true
        });

        this.setupWorkers();//se crea y usa
    }

    setupWorkers() {
        this.carWorker = new Worker('../gameobjects/Car.js');
        this.obstacleWorker = new Worker('../gameobjects/Obstruction.js');
        this.trackWorker = new Worker('../gameobjects/Track.js');

        this.carWorker.onmessage = (e) => {
            const updatedPlayer = e.data;
            this.player.x = updatedPlayer.x;
            this.player.y = updatedPlayer.y;
        };
        
        this.obstacleWorker.onmessage = (e) => {
            const updatedObstacle = e.data;
            this.obstacle.x = updatedObstacle.x;
            this.obstacle.y = updatedObstacle.y;
        };

        this.trackWorker.onmessage = (e) => {
            const trackSpeed = e.data.speed;
            this.track.setSpeed(trackSpeed);
        };

        //senddatos iniciales a los workers
        this.startConcurrentProcesses();
    }

    startConcurrentProcesses() {
        setInterval(() => {
            this.carWorker.postMessage({
                x: this.player.x,
                y: this.player.y,
                speed: this.player.speed
            });
            
            this.obstacleWorker.postMessage({
                x: this.obstacle.x,
                y: this.obstacle.y,
                playerSpeed: this.player.speed,
                screenWidth: this.scale.width
            });

            this.trackWorker.postMessage({
                speed: this.player.speed
            });
        }, 50);
    }

    updatePoints() {
        this.points += Math.floor(this.player.speed / 10);
        this.scene.get("HudScene").update_points(this.points);
    }

    gameOver() {
        this.carWorker.terminate();
        this.obstacleWorker.terminate();
        this.trackWorker.terminate();

        this.player.speed = 0;

        this.cameras.main.shake(500, 0.05);
        this.cameras.main.flash(500, 255, 0, 0);

        this.time.delayedCall(1000, () => {
            this.scene.start("GameOverScene", { points: this.points });
        }, [], this);
    }

    update() {
        if (this.cursors.up.isDown) {
            this.player.move("up");
        } else if (this.cursors.down.isDown) {
            this.player.move("down");
        }
    
        if (this.cursors.right.isDown) {
            this.player.accelerate();
            this.cameras.main.zoomTo(1.2, 500);
        } else if (this.cursors.left.isDown) {
            this.player.decelerate();
            this.cameras.main.zoomTo(1.0, 500);
        }

        this.track.update();
    }
}