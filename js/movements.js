function move (movement) {
  $("#alerta-info").hide();
  if (playerWins != -1) {
    if (movement == "right" || movement == "left") {
      rotate (movement);
    } else {
      walk (movement);
    }
    console.log("he entrat a move");

    show();
  }
}

function walk (movement) {
  x = player.estadoPartida.x;
  y = player.estadoPartida.y;

  switch (player.estadoPartida.direccion) {
    //Si player mira al Nord:
    case 0:
      if (movement == "forward") {
        ok = comprovaMoviment(x, y-1);
        if (ok == true) {
          player.estadoPartida.y--;
        }
      }
      else {
        ok = comprovaMoviment(x, y+1);
        if (ok == true) {
          player.estadoPartida.y++;
        }
      }
      break;

    //Si player mira al Sud:
    case 1:
      if (movement == "forward") {
        ok = comprovaMoviment(x, y+1);
        if (ok == true) {
          player.estadoPartida.y++;
        }
      }
      else {
        ok = comprovaMoviment(x, y-1);
        if (ok == true) {
          player.estadoPartida.y--;
        }
      }
    break;

    //Si player mira a l'Est:
    case 2:
      if (movement == "forward") {
        ok = comprovaMoviment(x+1, y);
        if (ok == true) {
          player.estadoPartida.x++;
        }
      }
      else {
        ok = comprovaMoviment(x-1, y);
        if (ok == true) {
           player.estadoPartida.x--;
        }
      }
    break;

    //Si player mira a l'Oest:
    case 3:
    if (movement == "forward") {
      ok = comprovaMoviment(x-1, y);
      if (ok == true) {
        player.estadoPartida.x--;
      }
    }
    else {
      ok = comprovaMoviment(x+1, y);
      if (ok == true) {
        player.estadoPartida.x++;
      }
    }
    break;
  }
}

function comprovaMoviment(x, y) {

  if (mapa[x][y] == "#") {
    $("#alerta-info").text("¡No puedes atravesar una pared!");
    $("#alerta-info").show();
    //alert ("No pots travessar una paret!");
    ok = false;
  } else {
    ok = true;
  }
  return ok;
}

function rotate (rotation) {
  switch (player.estadoPartida.direccion) {
      case 0:
        if (rotation == "left") player.estadoPartida.direccion = 3;
        else player.estadoPartida.direccion = 2;
        break;
      case 1:
        if (rotation == "left") player.estadoPartida.direccion = 2;
        else player.estadoPartida.direccion = 3;
        break;
      case 2:
        if (rotation == "left") player.estadoPartida.direccion = 0;
        else player.estadoPartida.direccion = 1;
        break;
      case 3:
        if (rotation == "left") player.estadoPartida.direccion = 1;
        else player.estadoPartida.direccion = 0;
        break;
    }
}

function drawCompass(direccio, x, y) {
  // Consigue el canvas
  if (direccio == 0) src = "BruixolaN.png";
  if (direccio == 1) src = "BruixolaS.png";
  if (direccio == 2) src = "BruixolaE.png";
  if (direccio == 3) src = "BruixolaO.png";

  var canvas = document.getElementById('compass');
  var context = canvas.getContext('2d');
  var base_image = new Image();
  base_image.src = "./media/images/"+src;
  base_image.onload = function () {
    // Pinta imagen en el canvas
    context.drawImage(this, x, y);
  };
}
