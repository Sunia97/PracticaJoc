var attacker = player;
var attacked = enemigo;

//Lluita entre l'enemic i el jugador que retorna true si el jugador guanya. .
function fight () {
  var playerWins = true;

  //torns d'atac mentre cap dels dos mor
  $("#alerta-pared").text("Jugador: " + jugador.vida + " Enemigo: " + enemigo.vida);
  $("#alerta-pared").show();
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
    attacker = enemigo;
    attacked = player;
  } else {
    attacked = enemigo;
    attacker = player;
  }

  console.log(player.vida, enemigo.vida);

  //TODO Mostrar titol d'atac (que no apareix fins que es mor)
  wait (1);
  //$("#alerta-pared").hide();
}

function enemyDies () {
  player.xp += enemigo.xp;

  //afegeix al jugador les eines de l'enemic
  var size = enemigo.objetos.length;

  for (var i = 0; i < size; i++) {
    var obj = enemigo.objetos[i];

    //Afegeix un nou objecte al jugador.
    player.mochila.push(obj);
    addWeaponButton(obj);
  }
}

function wait(seconds){
   var start = new Date().getTime();
   var end = start;
   while(end < start + seconds * 1000) {
     end = new Date().getTime();
  }
}
