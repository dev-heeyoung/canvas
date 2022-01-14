const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

let painting = false;
let filling = false;
const INITIAL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 650;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting) {
        ctx.beginPath()
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMourseDown() {
    painting = true;
}

function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRange(event){
    ctx.lineWidth = event.target.value;
}

function handleModeBtn(event){
    if(filling === true){
        filling = false;
        modeBtn.innerText = "Draw";
        
    } else {
        filling = true;
        modeBtn.innerText = "Paint";
        
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM() {
    modeBtn.preventDefault();
}

function handleSaveBtn(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("contextmene", handleCM);
    canvas.addEventListener("click", handleCanvasClick)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColor));

if (range) {
    range.addEventListener("input", handleRange);
}

if (modeBtn) {
    modeBtn.addEventListener("click", handleModeBtn);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveBtn);
}