import * as React from "react";

class SliderPuzzle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedImage: "",
        }
    }

    componentDidMount() {
        let context = this.canvas.getContext("2d");
        let image = new Image();
        image.addEventListener("load", () => {

            this.displayImage.addEventListener("load", () => {
                this.canvas.height = this.displayImage.height;
                this.canvas.width = this.displayImage.width;

                // Make slices

                let count = 3;
                let tileHeight = image.height/count;
                let tileWidth = image.width/count;
                let tiles = [];

                for (let row=0; row<count; row++) {
                    for (let col = 0; col < count; col++) {
                        let x = row * tileWidth;
                        let y = col * tileHeight;
                        tiles.push({
                            x: x,
                            y: y,
                            drawX: x,
                            drawY: y
                        });
                    }
                }

                // Shuffle Tiles
                for (let i=0; i<tiles.length; i++) {
                    let tile = tiles[i];
                    let roll = Math.floor(Math.random() * (tiles.length - i));
                    let sTile = tiles[roll];

                    let temp = {x: tile.x, y: tile.y};
                    tile.x = sTile.x;
                    tile.y = sTile.y;
                    sTile.x = temp.x;
                    sTile.y = temp.y;
                }

                let roll = Math.floor(Math.random() * tiles.length);
                let hiddenTile = tiles[roll];
                hiddenTile.hidden = true;

                let scale = this.displayImage.width / image.width;

                let render = () => {
                    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    for (let tile of tiles) {
                        if (tile.hidden) {
                            continue;
                        }
                        context.drawImage(image,
                            tile.drawX, tile.drawY, tileWidth, tileHeight,
                            tile.x * scale, tile.y * scale, tileWidth * scale, tileHeight * scale);
                    }
                };

                render();

                let canvasClick = (event) => {
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
                                let oldX = tile.x;
                                let oldY = tile.y;

                                tile.x = hiddenTile.x;
                                tile.y = hiddenTile.y;
                                hiddenTile.x = oldX;
                                hiddenTile.y = oldY;

                                // Check for win
                                // draw X and Y are technically the starting positions,
                                // so if all tiles x and y equal those, the game is won
                                let win = true;
                                for (let tile of tiles) {
                                    if (tile.x !== tile.drawX || tile.y !== tile.drawY) {
                                        win = false;
                                        break;
                                    }
                                }

                                if (win) {
                                    hiddenTile.hidden = false;
                                    this.canvas.removeEventListener("click", canvasClick);
                                }

                                render();
                            }
                        }
                    }
                };

                this.canvas.addEventListener("click", canvasClick);
            });
            this.displayImage.src = image.src;
        });

        image.src = "images/wolf001.jpg";
    }

    render() {
        return (
            <section>
                <canvas ref={(ele) => this.canvas = ele} />
                <section>
                    <img ref={(ele) => this.displayImage = ele} src={this.state.selectedImage} />
                </section>
            </section>
        )
    }
}

export default SliderPuzzle;