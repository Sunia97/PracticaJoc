function move (movement) {

  if (movement == "right" || movement == "left") {
    rotate (movement);
  } else {
    walk (movement);
  }

  show();
}

function walk (movement) {
  switch (player.estadoPartida.direccion) {
    case 0:
      if (movement == "forward") player.estadoPartida.y--;
      else player.estadoPartida.y++;
      break;
    case 1:
      if (movement == "forward") player.estadoPartida.y++;
      else player.estadoPartida.y--;
      break;
    case 2:
      if (movement == "forward") player.estadoPartida.x++;
      else player.estadoPartida.x--;
      break;
    case 3:
      if (movement == "forward") player.estadoPartida.x--;
      else player.estadoPartida.x++;
      break;
  }
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
