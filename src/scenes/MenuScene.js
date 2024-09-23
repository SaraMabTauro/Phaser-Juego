export class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    create() {
        this.add.rectangle(0, this.scale.height / 2, this.scale.width, 120, 0xffffff).setAlpha(0.8).setOrigin(0, 0.5);

        const start_msg = this.add.bitmapText(this.scale.width / 2, this.scale.height / 2 + 85, "pixelfont", "CLICK TO START", 24).setOrigin(0.5);

        this.tweens.add({
            targets: start_msg,
            alpha: 0,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.input.on("pointerdown", () => {
            if (this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
            
            this.scene.start("RaceScene");
        });
    }
}
