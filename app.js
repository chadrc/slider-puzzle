
window.addEventListener("load", () => {
    let canvas = document.getElementById("sliderCanvas");
    let context = canvas.getContext("2d");
    let original = document.getElementById("originalImage");

    let image = new Image();
    image.addEventListener("load", () => {
        console.log(`(${image.width}, ${image.height})`);

        original.addEventListener("load", () => {
            canvas.height = original.height;
            canvas.width = original.width;

            context.drawImage(image,
                0, 0, image.width, image.height,
                0, 0, original.width, original.height);
        });
        original.src = image.src;
    });

    image.src = "images/wolf001.jpg";
});
