
/*
    The following file contains all the logic for used to draw on the canvas.
    - Brian
**/

function drawCircle(tile) {
    var c = document.getElementById(tile);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.arc(c.width / 2, c.height / 2, 60, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawX(tile) {
    var c = document.getElementById(tile);
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(c.width, c.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "green";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(c.width, 0);
    ctx.lineTo(0, c.height);
    ctx.stroke();
}


function clearCanvas() {
    for (let i = 0; i < 9; i++) {
        var c = document.getElementById(i);
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
    }
}

function colorWinnerTiles(a, b, c, winType) {
    if (winType == "horizontal") {
        drawHorizontal(a);
        drawHorizontal(b);
        drawHorizontal(c);
    } else if (winType == "vertical") {
        drawVertical(a);
        drawVertical(b);
        drawVertical(c);
    } else if (winType == "diagonalR") {
        drawDiagonalRight(a);
        drawDiagonalRight(b);
        drawDiagonalRight(c);
    } else if (winType == "diagonalL") {
        drawDiagonalLeft(a);
        drawDiagonalLeft(b);
        drawDiagonalLeft(c);
    }
}

function drawDiagonalRight(tile) {
    var c = document.getElementById(tile);
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(c.width, c.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function drawDiagonalLeft(tile) {
    var c = document.getElementById(tile);
    var ctx = c.getContext("2d");

    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(c.width, 0);
    ctx.lineTo(0, c.height);
    ctx.stroke();
}

function drawVertical(tile) {
    var c = document.getElementById(tile);
    var ctx = c.getContext("2d");

    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(c.width / 2, 0);
    ctx.lineTo(c.width / 2, 200);
    ctx.lineTo(0, c.height);
    ctx.stroke();
}
function drawHorizontal(tile) {
    var c = document.getElementById(tile);
    var ctx = c.getContext("2d");
    
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(0, c.width/2);
    ctx.lineTo(c.width, c.width/2);
    ctx.stroke();
}