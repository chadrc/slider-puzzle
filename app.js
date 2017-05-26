
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
            let hiddenTile = tiles[roll];
            hiddenTile.hidden = true;

            let scale = original.width / image.width;
            for (let tile of tiles) {
                if (tile.hidden) {
                    continue;
                }
                context.drawImage(image,
                    tile.x, tile.y, tileWidth, tileHeight,
                    tile.x * scale, tile.y * scale, tileWidth * scale, tileHeight * scale);
            }

            canvas.addEventListener("click", (event) => {
                let x = event.offsetX;
                let y = event.offsetY;
                for (let tile of tiles) {
                    let tileX = tile.x * scale;
                    let tileY = tile.y * scale;
                    let tileW = (tileWidth * scale) + tileX;
                    let tileH = (tileHeight * scale) + tileY;
                    if (x > tileX && x < tileW && y > tileY && y < tileH) {
                        // Clicked a tile
                        if (tile === hiddenTile) {
                            // Clicked hidden tile, do nothing
                            return;
                        }
                        let hiddenTileX = hiddenTile.x * scale;
                        let hiddenTileY = hiddenTile.y * scale;
                        if (hiddenTileX === tileX && Math.abs(hiddenTileY - tileY) === tileHeight * scale
                            || hiddenTileY === tileY && Math.abs(hiddenTileX - tileX) === tileWidth * scale) {
                            // Clicked tile is next to hidden one
                            console.log("move click");
                        }
                    }
                }
            });
        });
        original.src = image.src;
    });

    image.src = "images/wolf001.jpg";
});