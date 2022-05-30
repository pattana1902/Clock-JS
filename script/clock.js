(function () {
    `use strict`;
    var btn = document.querySelector(`#btn`);
    var btn2 = document.querySelector(`#btn2`);
    var face = 1;
    btn.onclick = function () {
        face = 1;
    }
    btn2.onclick = function () {
        face = 2;
    }
    var canvas = document.querySelector(`#myClock`),
        canvasContext = canvas.getContext(`2d`),
        cX = canvas.width / 2,
        cY = canvas.width / 2,
        endX,
        endY,
        radius = 150,
        date,
        hours,
        minutes,
        seconds;
    initTime();
    if (canvasContext.getContext) {
        drawClock();
    } else {
        //Do 
    }
    setInterval(animateClock, 1000);

    function initTime() {
        date = new Date();
        hours = date.getHours() % 12;
        minutes = date.getMinutes();
        seconds = date.getSeconds();
    }
    function animateClock() {
        clearCanvas();
        refreshTime();
        drawClock(face);
    }
    function clearCanvas() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    }
    function refreshTime() {
        seconds += 1;
        if (Math.floor((seconds / 60)) !== 0) { minutes += 1; seconds %= 60; }
        if (Math.floor((minutes / 60)) !== 0) { hours += 1; minutes %= 60; }
    }
    function drawClock(faceNo) {
        drawClockBackground(faceNo);
        drawMinutesHand();
        drawHoursHand();
        drawSecondHand();
    }
    function drawHand(beginX, beginY, endX, endY) {
        canvasContext.beginPath();
        canvasContext.moveTo(beginX, beginY);
        canvasContext.lineTo(endX, endY);
        canvasContext.stroke();
        canvasContext.closePath();
    }
    function drawSecondHand() {
        var rotationUnit = seconds,
            rotationFactor = Math.PI / 30,
            rotation = rotationUnit * rotationFactor,
            handLength = 1 * radius;
        endX = cX + handLength * Math.sin(rotation);
        endY = cY - handLength * Math.cos(rotation);
        drawHand(cX, cY, endX, endY);
    }
    function drawMinutesHand() {
        var rotationUnit = minutes + seconds / 60,
            rotationFactor = Math.PI / 30,
            rotation = rotationUnit * rotationFactor,
            handLength = 0.8 * radius;
        endX = cX + handLength * Math.sin(rotation);
        endY = cY - handLength * Math.cos(rotation);
        drawHand(cX, cY, endX, endY);
    }
    function drawHoursHand() {
        var rotationUnit = 5 * hours + minutes / 12,
            rotationFactor = Math.PI / 30,
            rotation = rotationUnit * rotationFactor,
            handLength = 0.6 * radius;
        endX = cX + handLength * Math.sin(rotation);
        endY = cY - handLength * Math.cos(rotation);
        drawHand(cX, cY, endX, endY);
    }

    function drawClockBackground(faceClockNum) {
        if (faceClockNum == 1) {
            var correction = 1 / 300,
                shiftunit = 1 / 170,
                shiftFacotr = 1 / 30,
                angleInitialPosition = 2,
                angleCurrentPositionBegin = 0,
                angleCurrentPositionEnd = 0,
                repeat = 60,
                lineWidth = 10;
            for (var i = 0; i < repeat; i += 1) {
                angleCurrentPositionBegin = angleInitialPosition - (i * shiftFacotr) - correction;
                angleCurrentPositionEnd = angleCurrentPositionBegin + shiftunit;
                if (i % 5 == 0) lineWidth = 20;
                else lineWidth = 10;
                drawArcAtPosition(cX, cY, radius, angleCurrentPositionBegin * Math.PI, angleCurrentPositionEnd * Math.PI, false, lineWidth);
            }
        }
        if (faceClockNum == 2) {
            var correction = 1 / 10,
                shiftUnit = 1 / 1,
                shiftFactor = 1 / 10,
                angleInitialPosition = 2,
                angleCurrntPostionBegin = 0,
                angleCurrentPositionEnd = 0,
                repeat = 60,
                lineWidth = 10;
            for (var i = 0; i < repeat; i += 1) {
                angleCurrntPostionBegin = angleInitialPosition - (i * shiftFactor) - correction;
                angleCurrentPositionEnd = angleCurrntPostionBegin + shiftUnit;
                if (i % 5 == 0) lineWidth = 10;
                else lineWidth = 5
                drawArcAtPosition(cX, cY, radius, angleCurrntPostionBegin * Math.PI, angleCurrentPositionEnd * Math.PI, false, lineWidth);
            }
            // Draw numbers of clock face
            var ang;
            var num;
            canvasContext.font = radius * 0.15 + "px arial";
            canvasContext.textBaseline = "middle";
            canvasContext.textAlign = "center";
            for (num = 1; num < 13; num++) {
                ang = num * Math.PI / 6;
                canvasContext.rotate(ang);
                canvasContext.translate(0, -radius * 0.85);
                canvasContext.rotate(-ang);
                canvasContext.fillText(num.toString(), 200, 200);
                canvasContext.rotate(ang);
                canvasContext.translate(0, radius * 0.85);
                canvasContext.rotate(-ang);
            }
        }
        drawLiittleCircle(cX, cY);
    }
    function drawArcAtPosition(cX, cY, radius, starAngle, EndAnlge, counterClockwise, lineWidth) {
        canvasContext.beginPath();
        canvasContext.arc(cX, cY, radius, starAngle, EndAnlge, counterClockwise);
        canvasContext.lineWidth = lineWidth;
        canvasContext.strokeStyle = "black";
        canvasContext.stroke();
        canvasContext.closePath();
    }
    function drawLiittleCircle(cX, cY) {
        drawArcAtPosition(cX, cY, 4, 0 * Math.PI, 2 * Math.PI, false, 4);
    }
})();