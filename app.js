
window.addEventListener("load", () => {
    let canvas = document.getElementById("sliderCanvas");
    let context = canvas.getContext("2d");
    let original = document.getElementById("originalImage");

    let image = new Image();
    image.addEventListener("load", () => {

        original.addEventListener("load", () => {
            canvas.height = original.height;
            canvas.width = original.width;

            // Make slices

            let count = 3;
            let tileHeight = image.height/count;
            let tileWidth = image.width/count;
            let tiles = [];

            for (let row=0; row<count; row++) {
                for (let col = 0; col < count; col++) {
                    tiles.push({
                        x: row * tileWidth,
                        y: col * tileHeight
                    });
                }
            }

            let roll = Math.floor(Math.random() * tiles.length);
            tiles[roll].hidden = true;

            let scale = original.width / image.width;
            for (let tile of tiles) {
                if (tile.hidden) {
                    continue;
                }
                context.drawImage(image,
                    tile.x, tile.y, tileWidth, tileHeight,
                    tile.x * scale, tile.y * scale, tileWidth * scale, tileHeight * scale);
            }
        });
        original.src = image.src;
    });

    image.src = "images/wolf001.jpg";
});
