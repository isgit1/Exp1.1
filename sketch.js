let startTime;
let showTimer = false;
let colorChanged = false;
let tempoLimite;
let changeMoment = null;
let loaded = false;

function setup() {
  createCanvas(500, 400);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont('Georgia');
  noStroke();

  // splash some delay
  setTimeout(() => {
    document.getElementById('splash').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('splash').style.display = 'none';
      loaded = true;
    }, 1000);
  }, 1500);

  document.getElementById("resetBtn").addEventListener("click", resetAll);
}

function draw() {
  if (!loaded) return;
  drawGradientBackground();

  if (showTimer) {
    let elapsed = (millis() - startTime) / 1000;
    drawText(`Tempo: ${elapsed.toFixed(3)} s`, 32, width / 2, 60);

    if (!colorChanged && millis() - startTime >= tempoLimite) {
      colorChanged = true;
      changeMoment = elapsed;
    }

    if (changeMoment !== null) {
      drawText(`Cor mudou em: ${changeMoment.toFixed(3)} s`, 20, width / 2, height - 30);
    }

  } else {
    drawText("Clique para iniciar", 32, width / 2, 60);
  }

  drawCentralBox();
}

function mousePressed() {
  if (!showTimer && loaded) {
    startTime = millis();
    showTimer = true;
    colorChanged = false;
    changeMoment = null;
    tempoLimite = random(2000, 5000);
  }
}

function drawText(txt, size, x, y) {
  textSize(size);
  fill(255);
  text(txt, x, y);
}

function drawCentralBox() {
  push();
  rectMode(CENTER);
  fill(colorChanged ? color('#34c759') : color('#3a3a3a'));

  drawingContext.shadowOffsetX = 2;
  drawingContext.shadowOffsetY = 2;
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = 'rgba(0, 0, 0, 0.2)';

  rect(width / 2, height / 2 + 40, 120, 120, 24);
  pop();
}

function drawGradientBackground() {
  for (let i = 0; i <= height; i++) {
    let inter = i / height;
    let c = lerpColor(color('#1c1c1c'), color('#2a2a2a'), inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function resetAll() {
  showTimer = false;
  colorChanged = false;
  changeMoment = null;
}
