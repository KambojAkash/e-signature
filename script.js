// script.js
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementById("colors");
const thicknessSlider = document.getElementById("thicknessRange");

thicknessSlider.value = 2;

let isSigning = false;

canvas.addEventListener('mousedown', startSigning);
canvas.addEventListener('touchstart', startDrawingTouch);
canvas.addEventListener('mousemove', sign);
canvas.addEventListener('touchmove', drawTouch);
canvas.addEventListener('mouseup', endSigning);
canvas.addEventListener('touchend', stopDrawing);

function startSigning(event) {
    isSigning = true;
    ctx.beginPath();
    ctx.strokeStyle = colors.value;
    ctx.lineWidth = thicknessSlider.value;
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function sign(event) {
    if (isSigning) {
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
    }
}

function endSigning() {
    isSigning = false;
}

function startDrawingTouch(event) {
    var touch = event.touches[0];
    var x = touch.pageX - canvas.offsetLeft;
    var y = touch.pageY - canvas.offsetTop;
    ctx.beginPath();
    ctx.moveTo(x, y);
    canvas.addEventListener('touchmove', drawTouch);
    event.preventDefault();
}

function drawTouch(event) {
    var touch = event.touches[0];
    var x = touch.pageX - canvas.offsetLeft;
    var y = touch.pageY - canvas.offsetTop;
    ctx.lineTo(x, y);
    ctx.strokeStyle = colors.value;
    ctx.lineWidth = thicknessSlider.value;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    event.preventDefault();
}

function stopDrawing() {
    canvas.removeEventListener('touchmove', drawTouch);
}

document.getElementById('downloadButton').addEventListener('click', function() {
    const dataURL = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'signed_document.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

document.getElementById('clearButton').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('saveAsPDFButton').addEventListener('click', function() {
    const pdf = new jsPDF();
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('signed_document.pdf');
});

thicknessSlider.addEventListener('input', function(event) {
    thicknessSlider.value = event.target.value;
    console.log(ctx.lineWidth);
    ctx.lineWidth = thicknessSlider.value;
});
