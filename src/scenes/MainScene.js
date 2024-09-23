export class MainScene extends Phaser.Scene {
    cursors = null;
    points = 0;

    constructor() {
        super("MainScene");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.scene.launch("MenuScene");
        this.points = 0;
    }

    create() {
        this.add.image(0, 0, "background").setOrigin(0, 0);
        this.add.image(0, this.scale.height, "floor").setOrigin(0, 1);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.game.events.on("start-game", () => {
            this.scene.stop("MenuScene");
            this.scene.start("RaceScene");
        });
    }

    update() {

    }
}