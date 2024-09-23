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

        //configuramos las teclas
        this.cursors = this.input.keyboard.createCursorKeys();
    
        //colision entre el carro y el obstáculo
        this.physics.add.collider(this.player, this.obstacle, this.gameOver, null, this);
    
        //iniciar
        this.player.start();
    
        //seguimiento de la camara
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, this.scale.height);
    
        // Lanzar Hud
        this.scene.launch("HudScene");
        this.time.delayedCall(60000, this.gameOver, [], this);

        //puntos
        this.points = 0;
        this.time.addEvent({
            delay: 1000,
            callback: this.updatePoints,
            callbackScope: this,
            loop: true
        });

        this.startConcurrentProcesses();
    }

    startConcurrentProcesses() {
        // Subproceso 1: Movimiento del carro
        this.carProcess = setInterval(() => {
            this.player.update();
        }, 50);

        // Subproceso 2: Movimiento del obstáculo
        this.obstacleProcess = setInterval(() => {
            this.obstacle.update(this.player.speed);
        }, 50);

        // Subproceso 3: Ajustar la velocidad de la pista basada en la velocidad del carro
        this.trackProcess = setInterval(() => {
            this.track.setSpeed(this.player.speed * 0.1);
        }, 50);
    }

    hitObstacle() {
        if (!this.cameras.main.isShaking) {
            this.cameras.main.shake(200, 0.01);
            this.player.speed = Math.max(0, this.player.speed - 50);
        }
    }
    
    updatePoints() {
        this.points += Math.floor(this.player.speed / 10);
        this.scene.get("HudScene").update_points(this.points);
    }

    gameOver() {
        clearInterval(this.carProcess);
        clearInterval(this.obstacleProcess);
        clearInterval(this.trackProcess);

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