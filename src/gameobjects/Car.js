export class Car extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.state = "waiting";
        this.speed = 0;

        this.turbo_effect = this.scene.add.sprite(this.x - 32, this.y, "turbo-fire");
        this.turbo_effect.play("fire");
        this.turbo_effect.setVisible(false);
    }

    start() {
        this.state = "start";
        this.scene.tweens.add({
            targets: this,
            x: 200,
            duration: 800,
            delay: 1000,
            ease: "Power2",
            onComplete: () => {
                this.state = "can_move";
                this.turbo_effect.setPosition(this.x - 32, this.y);
                this.turbo_effect.setVisible(true);
            }
        });
    }

    onmessage = function(e) {
        const player = e.data;
    
        //posición del carro
        player.x += player.speed * 0.01;
    
        postMessage(player);
    };    

    move(direction) {
        if (this.state === "can_move") {
            if (direction === "up" && this.y - 10 > 0) {
                this.y -= 5;
            } else if (direction === "down" && this.y + 75 < this.scene.scale.height) {
                this.y += 5;
            }
            this.updateTurboEffect();
        }
    }

    accelerate() {
        if (this.state === "can_move") {
            this.speed = Math.min(this.speed + 10, 200);
            this.updateTurboEffect();
        }
    }

    decelerate() {
        if (this.state === "can_move" && this.speed > 0) {
            this.speed = Math.max(this.speed - 10, 0);
            this.updateTurboEffect();
        }
    }

    updateTurboEffect() {
        this.turbo_effect.setPosition(this.x - 32, this.y);
        this.turbo_effect.setVisible(this.speed > 0);
    }

    update() {
        this.y += Math.sin(this.scene.time.now / 200) * 0.10;
        this.turbo_effect.y = this.y;

        if (this.state === "can_move") {
            this.x += this.speed * 0.01;
        }
    }
}
