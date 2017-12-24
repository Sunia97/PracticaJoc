
//Funció que carrega un nivell del map i on es desenvolupa tot el joc amb crides a funcions
function loadNewLevel(level, gameJSON) {

  switch(level) {
    case -2:
      mapa = gameJSON[0].map;//Assigno el nivell (mapa) que toca a mapa
      iniciaPartida(); //carrega la posició del jugador i el que calgui
      show();
      estatPartida = 0; //indica l'estat de la partida: 0 = jugador viu, 1 = sense vides, 2 = èxit!

      //Bucle que comprova que el jugador segueix viu
      while (estatPartida == 0) {
        comprovaPartida();
      }

      if (estatPartida == 1) {
        alert("has perdut!");
        // TODO: que passa quan perd?
      } else {
        alert("has superat el nivell -2");
        level = -1;
      }

      return level;//Un cop superat nivell

    /*
    case -1:
      mapa = gameJSON[1].map;//Assigno el nivell (mapa) que toca a mapa

      //TODO

      console.log("Superat nivell -1");
      level = 0;//Un cop superat nivell
      return level;
    case 0:
      mapa = gameJSON[2].map;//Assigno el nivell (mapa) que toca a mapa

      //TODO

      console.log("Superat nivell 0");
      level = 1;//Un cop superat nivell
      return level;*/
    }
  }

function iniciaPartida(mapa) {
  alert(mapa);
  x = 0;
  y = 0;
  fi = 0;
  while (x < 11 && fi == 0) {
    console.log(x);
    while (y < 11 && fi == 0) {
      console.log(y);
        if  (mapa[x][y] == "P") {
        console.log("posicio", x, y);
        player.estadoPartida.x = x;
        player.estadoPartida.y = y;
        fi = 1;
      }
    }
  }
  //for (x = 0; x<11; x++) {
  //  console.log(x)
  //  for (y = 0; y<11; y++) {
  //    console.log(y)
  //    if (mapa[x][y] == "P"){
  //      console.log("posicio")
  //      player.estadoPartida.x = x;
  //      player.estadoPartida.y = y;
  //    }
  //  }
  //}
  console.log("he sortit", player.estadoPartida.x, player.estadoPartida.y);
  show();
}

function comprovaPartida(mapa, estatPartida) {
  if (mapa[player.x][player.y]=="E") {
    estatPartida = 2;
  }
  if (player.vida == 0) {
    estatPartida = 1;
  }
}

// TODO: Posar aquestes funcions de logica de moviments en un altre .js

function move (moviment) {
switch (player.estadoPartida.direccion) {
    case 0:
      if (moviment == "forward") player.estadoPartida.y--;
      else player.estadoPartida.y++;
      break;
    case 1:
      if (moviment == "forward") player.estadoPartida.y++;
      else player.estadoPartida.y--;
      break;
    case 2:
      if (moviment == "forward") player.estadoPartida.x++;
      else player.estadoPartida.x--;
      break;
    case 3:
      if (moviment == "forward") player.estadoPartida.x--;
      else player.estadoPartida.x++;
      break;
  }
}

function rotate (rotacio) {
  switch (player.estadoPartida.direccion) {
      case 0:
        if (rotacio == "left") player.estadoPartida.direccion = 3;
        else player.estadoPartida.direccion = 2;
        break;
      case 1:
        if (rotacio == "left") player.estadoPartida.direccion = 2;
        else player.estadoPartida.direccion = 3;
        break;
      case 2:
        if (rotacio == "left") player.estadoPartida.direccion = 0;
        else player.estadoPartida.direccion = 1;
        break;
      case 3:
        if (rotacio == "left") player.estadoPartida.direccion = 1;
        else player.estadoPartida.direccion = 0;
        break;
    }
}

function show () {
  x = player.estadoPartida.x;
  y = player.estadoPartida.y;

  switch (player.estadoPartida.direccion) {
      case 0:
        pintaPosicion(x, y--);
        break;
      case 1:
        pintaPosicion(x, y++);
        break;
      case 2:
        pintaPosicion(x++, y);
        break;
      case 3:
        pintaPosicion(x--, y);
        break;
    }
}
