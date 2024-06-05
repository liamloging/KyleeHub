var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

// List of images from KyleeHub
var images = [
    "6BA53505-E5B0-43FA-A6F7-181EF99F34BA.jpeg",
    "6E2D3804-C2F9-4A34-B98F-2D20468EF48E.jpeg",
    "3C0AECD3-D6E6-484A-861A-2286A2919210.jpeg",
    "76D991DC-DB0A-45B1-BDCF-48CBACE68462.jpeg",
    "48A4B017-16EC-468D-8B10-5445479A6087.jpeg",
    "8C7D25DB-49F3-4DC1-B7BA-AC2C99383024.jpeg",
    "CCE5C052-0C42-4914-9FC2-BBF36267E14D.jpeg",
    "530492D8-0AF3-40DB-8FB0-7922C4295C75.jpeg",
    "1FF540AF-2171-44C1-8E79-2338EF57839B.jpeg",
    "D073AC0A-CA34-4346-A7F4-BD7876979CEF.jpeg",
    "C769CC2E-AC26-461C-8610-6470939FA59C.jpeg",
    "635294E8-C1C3-47AC-926A-630840B519D7.jpeg",
    "AC47652D-5131-4648-9097-BBE318DA20BF.jpeg",
    "AA9A6813-3DB0-4AE8-B51C-149AC715FE4A.jpeg",
    "6282E89B-0BEE-4F84-B8C4-5098490AF9E0.jpeg",
    "281651AE-B16A-4D70-B9CB-6C6B79D02C02.jpeg",
    "14D63355-C025-468A-93E1-A4DE55B63B61.jpeg",
    "A531F157-1649-4FEE-BB04-826B82935DD5.jpeg",
    "24D40F2C-E34B-4D3F-A6C6-2460DEF30C8F.jpeg",
    "B71AC70F-F79D-445E-92D3-E2F119326C64.jpeg",
    "5738B0B2-8E39-4D06-ABD8-F8FABFEF058C.jpeg",
    "F69E092E-1D89-4C15-8AA0-514E20A2C4F8.jpeg"
];

window.onload = function() {
    // Select a random image
    let randomImage = images[Math.floor(Math.random() * images.length)];

    // Initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    // Pieces
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString()); // put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        // Swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + randomImage + "?piece=" + pieces[i];

        // DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }
}

// DRAG TILES
function dragStart() {
    currTile = this; // this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; // this refers to image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}
