let redScore = 0;
let blueScore = 0;

let redShip = {
  left: 30,
  top: 550,
};

let blueShip = {
  left: 920,
  top: 550,
};

let redDir = false;
let blueDir = false;

let redShootingDisabled = true;
let blueShootingDisabled = true;

let blueBullets = [];
let redBullets = [];

document.onkeydown = function (e) {
  console.log(e);
  if (e.code === "KeyA" || e.key === "a") {
    redDir = redDir != true;
  }

  if ((e.code === "KeyS" || e.key === "s") && redShootingDisabled == false) {
    redBullets.push({ left: redShip.left + 50, top: redShip.top + 28 });
    shootingAudio();
    redShootingDisabled = true;
    setTimeout(function () {
      redShootingDisabled = false;
    }, 300);
  }

  if ((e.code === "KeyL" || e.key === "l") && blueShootingDisabled == false) {
    blueBullets.push({ left: blueShip.left, top: blueShip.top + 28 });
    shootingAudio();
    blueShootingDisabled = true;
    setTimeout(function () {
      blueShootingDisabled = false;
    }, 300);
  }
  if (e.code === "KeyK" || e.key === "k") {
    blueDir = blueDir != true;
  }
};

function moveShips() {
  if (redDir) {
    redShip.top += 7;
    if (redShip.top > window.innerHeight - 185) {
      redShip.top = window.innerHeight - 185;
    }
  } else {
    redShip.top -= 7;
    if (redShip.top < 70) {
      redShip.top = 70;
    }
  }

  if (blueDir) {
    blueShip.top += 7;
    if (blueShip.top > window.innerHeight - 185) {
      blueShip.top = window.innerHeight - 185;
    }
  } else {
    blueShip.top -= 7;
    if (blueShip.top < 70) {
      blueShip.top = 70;
    }
  }
  document.getElementById("redShip").style.top = redShip.top + "px";
  document.getElementById("blueShip").style.top = blueShip.top + "px";
}

function drawRedBullets() {
  for (let b = 0; b < redBullets.length; b++) {
    document.getElementById(
      "bullets"
    ).innerHTML += `<div class='redBullets' style='left:${redBullets[b].left}px; 
    top:${redBullets[b].top}px;'></div>`;
  }
}

function openControls() {
  document.getElementById("overlay").innerHTML = "";
  document.getElementById("overlay").innerHTML = `
    <div id='controlsbox'><br>
    <center><image src='images/x-How to play.png'/></center><br><br><br>
    <center><image src='images/x-Switch direction - A.png'/></center><br><br>
    <center><image src='images/x-Shoot - S.png'/></center><br><br>
    <center><image src='images/x-Switch direction - K.png'/></center><br><br>
    <center><image src='images/x-Shoot - L.png'/></center><br><br>
    <center><image src='images/x-Firstto5wins.png'/></center><br><br><br><br><br><br><br><br>
    <center><input type="image" src="images/x-Back.png" onclick="closeControls()"></input></center>
    </div>`;
}

function closeControls() {
  document.getElementById("overlay").innerHTML = "";
  document.getElementById("overlay").innerHTML = `
  <center><input type="image" src="images/x-Start.png" onclick="startGame()"></input></center>
  <br><br>
  <center><input type="image" src="images/x-How to play.png" onclick="openControls()"></input></center>`;
}

function drawBlueBullets() {
  for (let b = 0; b < blueBullets.length; b++) {
    document.getElementById(
      "bullets"
    ).innerHTML += `<div class='blueBullets' style='left:${blueBullets[b].left}px; 
    top:${blueBullets[b].top}px;'></div>`;
  }
}

function drawBullets() {
  document.getElementById("bullets").innerHTML = "";
  drawRedBullets();
  drawBlueBullets();
}

function moveBullets() {
  for (let b = 0; b < redBullets.length; b++) {
    redBullets[b].left += 25;
  }

  for (let b = 0; b < blueBullets.length; b++) {
    blueBullets[b].left -= 25;
  }
}

function collisionDetection() {
  for (let b = 0; b < redBullets.length; b++) {
    let a1 = redBullets[b].top <= blueShip.top + 55;
    let a2 = redBullets[b].top > blueShip.top;
    let a3 = redBullets[b].left <= blueShip.left + 50;
    let a4 = redBullets[b].left >= blueShip.left + 1;
    if (a1 && a2 && a3 && a4) {
      redBullets.splice(b, 1);
      redScore += 1;
      explosionAudio();
    }

    if (redBullets[b].left > blueShip.left + 50) {
      redBullets.splice(b, 1);
    }
  }

  for (let b = 0; b < blueBullets.length; b++) {
    let a1 = blueBullets[b].top <= redShip.top + 55;
    let a2 = blueBullets[b].top > redShip.top;
    let a3 = blueBullets[b].left <= redShip.left + 49;
    let a4 = blueBullets[b].left >= redShip.left;
    if (a1 && a2 && a3 && a4) {
      blueBullets.splice(b, 1);
      blueScore += 1;
      explosionAudio();
    }

    if (blueBullets[b].left < 0) {
      blueBullets.splice(b, 1);
    }
  }
}

function updateScore() {
  document.getElementById("redHalf").innerHTML = "";
  document.getElementById("redHalf").innerHTML += `<h1>${redScore}</h1>`;
  document.getElementById("blueHalf").innerHTML = "";
  document.getElementById("blueHalf").innerHTML += `<h1>${blueScore}</h1>`;
}

function startGame() {
  redShootingDisabled = false;
  blueShootingDisabled = false;
  document.getElementById("overlay").innerHTML = "";
  document.getElementById("overlay").style.backgroundColor =
    "rgba(255,255,255,0)";
  document.getElementById("bullets").innerHTML =
    '<div class="blueBullets"></div><div class="redBullets"></div>';
  game();
}

function explosionAudio() {
  let audio1 = new Audio("audio/explosionAudio.mp3");
  audio1.play();
}

function shootingAudio() {
  let audio2 = new Audio("audio/laser5.wav");
  audio2.play();
}

function restartGame() {
  blueBullets = [];
  redBullets = [];
  redDir = false;
  blueDir = false;
  redScore = 0;
  blueScore = 0;
  redShip = {
    left: 30,
    top: 550,
  };

  blueShip = {
    left: 920,
    top: 550,
  };
  document.getElementById("redShip").style.top = redShip.top + "px";
  document.getElementById("redShip").style.left = redShip.left + "px";
  document.getElementById("blueShip").style.top = blueShip.top + "px";
  document.getElementById("blueShip").style.left = blueShip.left + "px";
  startGame();
}

function gameOver() {
  redShootingDisabled = true;
  blueShootingDisabled = true;
  document.getElementById("overlay").style.backgroundColor =
    "rgba(255,255,255,0.2)";
  document.getElementById("overlay").innerHTML =
    redScore == 5
      ? '<center><img src="images/x-red wins.png"/></center>'
      : '<center><img src="images/x-blue wins.png"/></center>';
  document.getElementById("overlay").innerHTML +=
    '<br><br><center><input type="image" src="images/x-Restart.png" onclick="restartGame()"></input></center>';
}

function game() {
  updateScore();
  if (redScore == 5 || blueScore == 5) {
    return gameOver();
  } else {
    setTimeout(game, 50);
  }
  moveShips();
  moveBullets();
  drawBullets();
  collisionDetection();
}
