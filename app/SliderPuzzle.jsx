import * as React from "react";
import ImageSelection from "./ImageSelection";

import "./SliderPuzzle.scss";

const Choosing = 1;
const Playing = 2;
const Won = 3;

class SliderPuzzle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedImage: "",
            status: Choosing,
            tiles: []
        }
    }

    componentDidMount() {
        return;
        let image = new Image();
        image.addEventListener("load", () => {
            console.dir(image);
            this.displayImage.src = image.src;
        });
        image.src = this.state.selectedImage;

        this.setState({
            image: image
        })
    }

    displayImageLoad() {
        this.canvas.height = this.displayImage.height;
        this.canvas.width = this.displayImage.width;

        // Make slices
        let count = 3;
        let tileHeight = this.state.image.height/count;
        let tileWidth = this.state.image.width/count;
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

        let scale = this.displayImage.width / this.state.image.width;

        this.setState({
            tiles: tiles,
            scale: scale,
            hiddenTile: hiddenTile,
            count: count,
            tileHeight: tileHeight,
            tileWidth: tileWidth
        });
    }

    canvasClick(event) {
        if (this.state.status !== Playing) {
            return;
        }

        let canvasRect = this.canvas.getBoundingClientRect();
        let x = event.clientX - canvasRect.left;
        let y = event.clientY - canvasRect.top;
        for (let tile of this.state.tiles) {
            let tileX = tile.x * this.state.scale;
            let tileY = tile.y * this.state.scale;
            let tileW = (this.state.tileWidth * this.state.scale) + tileX;
            let tileH = (this.state.tileHeight * this.state.scale) + tileY;
            if (x > tileX && x < tileW && y > tileY && y < tileH) {
                // Clicked a tile
                if (tile === this.state.hiddenTile) {
                    // Clicked hidden tile, do nothing
                    return;
                }
                let hiddenTileX = this.state.hiddenTile.x * this.state.scale;
                let hiddenTileY = this.state.hiddenTile.y * this.state.scale;
                if (hiddenTileX === tileX && Math.abs(hiddenTileY - tileY) === this.state.tileHeight * this.state.scale
                    || hiddenTileY === tileY && Math.abs(hiddenTileX - tileX) === this.state.tileWidth * this.state.scale) {
                    // Clicked tile is next to hidden one
                    let oldX = tile.x;
                    let oldY = tile.y;

                    tile.x = this.state.hiddenTile.x;
                    tile.y = this.state.hiddenTile.y;
                    this.state.hiddenTile.x = oldX;
                    this.state.hiddenTile.y = oldY;

                    // Check for win
                    // draw X and Y are technically the starting positions,
                    // so if all tiles x and y equal those, the game is won
                    let win = true;
                    for (let tile of this.state.tiles) {
                        if (tile.x !== tile.drawX || tile.y !== tile.drawY) {
                            win = false;
                            break;
                        }
                    }

                    if (win) {
                        this.state.hiddenTile.hidden = false;
                    }

                    this.setState({
                        tiles: this.state.tiles,
                        hiddenTile: this.state.hiddenTile
                    })
                }
            }
        }
    }

    render() {
        switch (this.state.status) {
            case Choosing:
                return <ImageSelection />;

            case Playing:
                return (
                    <section>
                        <canvas ref={(ele) => this.canvas = ele} onClick={(e) => {
                            console.log(e);
                            this.canvasClick(e)
                        }} />
                        <section>
                            <img ref={(ele) => this.displayImage = ele}
                                 src={this.state.selectedImage}
                                 onLoad={() => this.displayImageLoad()} />
                        </section>
                    </section>
                );

            case Won:
                // TODO
        }
        return (
            <section>
                <canvas ref={(ele) => this.canvas = ele} onClick={(e) => {
                    console.log(e);
                    this.canvasClick(e)
                }} />
                <section>
                    <img ref={(ele) => this.displayImage = ele}
                         src={this.state.selectedImage}
                         onLoad={() => this.displayImageLoad()} />
                </section>
            </section>
        )
    }

    componentDidUpdate() {
        let context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let tile of this.state.tiles) {
            if (tile.hidden) {
                continue;
            }
            context.drawImage(this.state.image,
                tile.drawX, tile.drawY,
                this.state.tileWidth, this.state.tileHeight,

                tile.x * this.state.scale, tile.y * this.state.scale,
                this.state.tileWidth * this.state.scale, this.state.tileHeight * this.state.scale);
        }
    }
}

export default SliderPuzzle;