export class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    create(data) {
        this.add.rectangle(0, this.scale.height / 2, this.scale.width, 120, 0xffffff).setAlpha(0.8).setOrigin(0, 0.5);

        this.add.bitmapText(this.scale.width / 2, this.scale.height / 2, "pixelfont", "GAME OVER", 52)
            .setOrigin(0.5);

        this.add.bitmapText(this.scale.width / 2, this.scale.height / 2 + 85, "pixelfont", `POINTS: ${data.points}`, 24)
            .setOrigin(0.5);

        this.add.bitmapText(this.scale.width / 2, this.scale.height / 2 + 130, "pixelfont", "CLICK TO RESTART", 24)
            .setOrigin(0.5);

        this.input.on("pointerdown", () => {
            this.scene.start("MainScene");
        });
    }
}