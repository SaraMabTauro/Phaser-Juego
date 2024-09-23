export class HudScene extends Phaser.Scene {
    remaining_time = 0;
    points = 0;

    constructor() {
        super("HudScene");
    }

    init(data) {
        this.remaining_time = data.remaining_time || 60;
    }

    create() {
        this.points_text = this.add.bitmapText(10, 10, "pixelfont", "POINTS:0000", 24);
        this.remaining_time_text = this.add.bitmapText(this.scale.width - 10, 10, "pixelfont", `REMAINING:${this.remaining_time}s`, 24)
            .setOrigin(1, 0);
    }

    update_points(points) {
        this.points_text.setText(`POINTS:${points.toString().padStart(4, "0")}`);
    }

    update_time(time) {
        this.remaining_time_text.setText(`REMAINING:${time.toString().padStart(2, "0")}s`);
    }
}