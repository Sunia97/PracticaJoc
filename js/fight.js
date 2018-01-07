var attacker = player;
var attacked = enemigo;

//Lluita entre l'enemic i el jugador que retorna true si el jugador guanya. .
function fight () {
  var playerWins = true;

  //torns d'atac mentre cap dels dos mor
  while (player.vida > 0 && enemigo.vida > 0) {
    attacks();
  }

  //El jugador mor
  if (player.vida <= 0) {
    playerWins = false;
    console.log("JUGADOR MORT");
  }

  //L'enemic mor
  if (enemigo.vida <= 0) {
    enemyDies ();
    console.log("ENEMIC MORT");
  }

  updatePlayer ();
  return playerWins;
}

//TODO Es crea bucle infinit si l'enemic té atac i defensa = 0
function attacks () {
  var attack = attacker.ataque - attacked.defensa;

  if (attack >= 0) {
    attacked.vida -= attack;
  }

  if (attacker == player) {
    $("#alerta-pared").text("El jugador ataca" + attack);
    attacker = enemigo;
    attacked = player;
  } else {
    console.log("El enemigo ataca" + attack);
    attacked = enemigo;
    attacker = player;
  }

  $("#alerta-pared").show();
  //TODO Mostrar titol d'atac
  wait (3);
}

function enemyDies () {
  player.xp += enemigo.xp;
  if (player.mochila.size < 8) {
     //afegeix al jugador les eines de l'enemic
    var size = enemigo.objetos.length;

    for (var i = 0; i < size; i++) {
      var obj = enemigo.objetos[i];

      //Afegeix un nou objecte al jugador.
      player.mochila.push(obj);
      addWeaponButton(obj);
    }
  } else {
    $("#alerta-pared").text("No tienes espacio en la mochila!");
    $("#alerta-pared").show();
  }
}

function wait(seconds){
   var start = new Date().getTime();
   var end = start;
   while(end < start + seconds * 1000) {
     end = new Date().getTime();
  }
}
