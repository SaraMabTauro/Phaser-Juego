export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: "Preloader" });
    }

    preload() {
        this.load.setPath("assets");

        this.load.image("logo", "logo.png");
        this.load.image("background", "background.png");
        this.load.image("floor", "floor.png");
        this.load.image("carrito", "carrito.png");
        this.load.atlas("turbo-fire", "car/turbo/turbo-fire_.png", "car/turbo/turbo-fire_atlas.json");
        this.load.animation("turbo-fire-anim", "car/turbo/turbo-fire_anim.json");
        this.load.image("obs-rock", "obstaculo/rock/obs-rock.png");

        this.load.bitmapFont("pixelfont", "fonts/pixelfont.png", "fonts/pixelfont.xml");
        this.load.image("knighthawks", "fonts/knighthawks.png", "fonts/knighthawks.xml");

        this.load.on("progress", (progress) => {
            console.log("Cargando: " + Math.round(progress * 100) + "%");
        });
    }

    create() {
        this.scene.start("MenuScene");
    }
}
