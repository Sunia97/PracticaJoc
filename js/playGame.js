var numNivells = 3; //Nombre de nivells que tenim al joc
var objects = 0;//Nombre d'objectes que té el jugador
var left_weapon = 0;//Nombre de l'arma de la mà dreta
var right_weapon = 0;//Nombre de l'arma de la mà esquerra
var id_llave;

/**
* Mostra en pantalla les dades i els objectes del jugador.
* @param {number} level Nivell en el que es troba el jugador
**/
function showAttributes (isNewGame) {

  if (isNewGame == true) {
    objects = 0;

    $("#left_hand").text("Mano Izquierda");
    left_weapon = 0;

    $("#right_hand").text("Mano Derecha");
    right_weapon = 0;

    for (var i = 0; i < 8; i++) {
      $("#item" + (i+1)).text("ESPACIO LIBRE");
    }
  }else {

    objects = 0;

    $("#left_hand").text("Mano Izquierda");
    left_weapon = 0;

    $("#right_hand").text("Mano Derecha");
    right_weapon = 0;

    for (var j = 0; j < player.mochila.length; j++) {
      addWeaponButton(player.mochila[j]);
    }
    for (var y = j; y < 8; y++) {
      $("#item" + (y+1)).text("ESPACIO LIBRE");
    }
  }

  $("#name").text(player.nombre);
  $("#lives").text(player.vida);
  $("#level").text(player.nivel);
  $("#attack").text(player.ataque);
  $("#defense").text(player.defensa);
  $("#xp").text(player.xp);
}

/**
* Afegeix a la motxilla una arma
* @param {string} obj Objecte a afegir
**/
function addWeaponButton (obj) {
  var id_object = "#item" + (objects + 1);
  var object_button = "<br/><img class='weapon' src='media/images/objects/" + objetos[obj].path + "'>";

  if (obj == "llave") id_llave = id_object;

  objects ++;
  $(id_object).text(obj);
  $(id_object).append(object_button);
}

/**
* Segons les armes que té a les mans actualitza atac i defensa.
**/
function propertiesHands () {
  if (player.manoderecha != "") {
    var object_right = objetos[player.manoderecha];
    player.ataque = object_right.ataque;
    player.defensa = object_right.defensa;
  } else {
    player.ataque = 0;
    player.defensa = 0;
  }

  if (player.manoizquierda != "") {
    var object_left = objetos[player.manoizquierda];
    if (object_left.ataque == undefined) {
      player.ataque = 0;
      player.defensa = 0;
    } else {
      player.ataque += object_left.ataque;
      player.defensa += object_left.defensa;
    }
  }

  $("#attack").text(player.ataque);
  $("#defense").text(player.defensa);
}

/**
* Canvia l'arma que el jugador té a la mà
* @param {string} id_hand Id del botó de la mà a canviar
**/
function changeWeapon (id_hand) {
  var weapon = "";

  if (id_hand == "#left_hand") {
    left_weapon ++;
    if (left_weapon == right_weapon) left_weapon ++;

    if (left_weapon == player.mochila.length + 1) {
      $(id_hand).text("Mano Izquierda");
      left_weapon = 0;
      player.manoizquierda = "";
    } else {
      weapon = player.mochila[left_weapon - 1];
      player.manoizquierda = weapon;
      $(id_hand).text("Mano Izquierda");
      $(id_hand).append ("<br/><br/>" + weapon + "<br/><img class = 'row_center' src='media/images/objects/" + objetos[weapon].path + "'/>");

      if (weapon != "llave") {
        $(id_hand).append ("<br/>Ataque: " + objetos[weapon].ataque + "<br/>Defensa: " + objetos[weapon].defensa);
      }
    }
  } else {
    right_weapon ++;
    if (left_weapon == right_weapon) right_weapon ++;

    if (right_weapon == player.mochila.length + 1) {
      $(id_hand).text("Mano Derecha");
      right_weapon = 0;
      player.manoderecha = "";
    } else {
      weapon = player.mochila[right_weapon - 1];
      player.manoderecha = weapon;
      $(id_hand).text("Mano Derecha");
      $(id_hand).append ("<br/><br/>" + weapon + "<br/><img class = 'row_center' src='media/images/objects/" + objetos[weapon].path + "'/>");

      if (weapon != "llave") {
        $(id_hand).append ("<br/>Ataque: " + objetos[weapon].ataque + "<br/>Defensa: " + objetos[weapon].defensa);
      }
    }
  }

  propertiesHands();
}

/**
* Mostra la casella que el jugador té davant
**/
function show () {
  x = player.estadoPartida.x;
  y = player.estadoPartida.y;
  console.log("Soc el show")
  switch (player.estadoPartida.direccion) {
      case 0:
        pintaPosicion(x, y - 1);
        break;
      case 1:
        pintaPosicion(x, y + 1);
        break;
      case 2:
        pintaPosicion(x + 1, y);
        break;
      case 3:
        pintaPosicion(x - 1, y);
        break;
  }

  drawCompass(player.estadoPartida.direccion, 0, 0);
  checkGame(x, y);
}

/**
*Rep la casella que el jugador té davant
**/
function checkGame(x, y) {

  if (mapa[x][y] == "E") {
    esViu = fight();
    if (esViu == 1) mapa[x][y] = "·";
  }

  updatePlayer ();
  //Si està viu:
  if (player.vida > 0) {
    //console.log("entra a perd")
    //pintaImagen("you_lose.png", 0, 0);
    if (mapa[player.estadoPartida.x][player.estadoPartida.y] == "D") {
      checkDoor();
      show();
    }
    if (mapa[player.estadoPartida.x][player.estadoPartida.y] == "O") {
      console.log("hla");
      checkObject(random_obj);
      show();
    }
    if (mapa[player.estadoPartida.x][player.estadoPartida.y] == "K") {
      checkObject("llave");
      show();
    }
  }
}

/**
* El jugador es troba una porta i entra en ella.
**/
function checkDoor () {
  if (player.manoderecha == "llave" || player.manoizquierda == "llave"){
    if (confirm("Vols pujar de nivell?")) {
      able = false;
      player.estadoPartida.nivel++;
      player.mochila.pop("llave");
      if (manoderecha == "llave") {
        manoderecha = "";
        $("right_hand").text("Mano Derecha");
      }
      if (manoizquierda == "llave") {
        manoizquierda = "";
        $("left_hand").text("Mano Izquierda");
      }
      player.mochila.pop("llave");
      $(id_llave).text("ESPACIO LIBRE");
      loadNewLevel(player.estadoPartida.nivel);
    } else {
      alert("esperem veure't aviat");
      stepBackwards();
    }
  } else {
    $("#alerta-info").text("Necessitas una llave para abrirla");
    $("#alerta-info").show();
    stepBackwards();
  }
}

/**
* movem el jugador una casella enrere
**/
function stepBackwards () {
  switch (player.estadoPartida.direccion) {
      case 0:
        player.estadoPartida.y++;
        break;
      case 1:
        player.estadoPartida.y--;
        break;
      case 2:
        player.estadoPartida.x--;
        break;
      case 3:
        player.estadoPartida.x++;
        break;
    }
}

/**
* El jugador es troba un objecte i avança per agafar-lo.
* @param {string} obj Objecte trobat
**/
function checkObject (obj) {
  player.mochila.push (obj);
  addWeaponButton(obj);
  $("#alerta-info").text("Has encontrado el objeto: " + obj);

  $("#alerta-info").show();
  mapa[player.estadoPartida.x][player.estadoPartida.y] = ".";
}

/**
* Actualitza el nivell, defensa i atac del jugador
**/
function updatePlayer () {
  //XP acumulats d'altres nivells.
  var xp = 0;
  for (i = player.nivel; i > 1; i--) {
    xp += player.nivel * 10;
  }

  //El jugador puja de nivell
  if (player.xp >= 10 * (player.nivel + 1) + xp) {
    player.nivel ++;
    player.defensa --;
    player.vida += player.nivel * 10;
    console.log("PUJA NIVELL " + player.nivel);
  }

  //Cada dos nivells es puja 1 d'atac
  if (player.nivel % 2 == 0) {
    player.ataque ++;
  }
}

/**
* Afegeix una arma aleatòria a l'enemic
**/
function addWeaponEnemy (){
  weapon = getRandomObject ();
  while (weapon == "llave") {
    weapon = getRandomObject ();
  }

  enemigo.objetos = [weapon];
  enemigo.ataque += objetos[weapon].ataque;
  enemigo.defensa += objetos[weapon].defensa;
  enemigo.vida = Math.floor(Math.random() * 10 + 1);
  enemigo.xp = 5 * Math.floor(Math.random() * (player.nivel + 1) + 1);

  $("#alerta-info").text("Tiene: " + enemigo.objetos + "/ XP: " + enemigo.xp + "/ Vida: " + enemigo.vida + " Avanza para luchar");
  $("#alerta-info").show();
}
