//FUNCIÓ PER GUARDAR PARTIDA
function saveGame (slotGuardar) {

  if (slotGuardar == 1 || slotGuardar == 2) {
    gameJSON[2] = player;
    deleteAndSaveGameJSON(slotGuardar);
  }

  $("#save-game-panel").hide();
  $("#game-saved-panel").show();
}

function loadGame (slotCarregar) {

  if (slotCarregar == 0) {
    slotCarregar = "nueva";
  }

  downloadStructureJSON (slotCarregar, function callback(result) {
    gameJSON = result;

    if (slotCarregar == "nueva") {
      loadNewLevel(gameJSON[2].estadoPartida.nivel, true);
    }else {
      loadNewLevel(gameJSON[2].estadoPartida.nivel, false);
    }
    //console.log("Callback fet. gameJSON carregat des del server.");
  });

  $("#load-game-panel").hide();
  $("#game-loaded-panel").show();
}

function showLoad() {
  $("#load-game-panel").show();
}

function showSave() {
  $("#save-game-panel").show();
}

function cancelSave() {
  $("#save-game-panel").hide();
}

function cancelLoad() {
  $("#load-game-panel").hide();
}

function hideSavedPanel() {
  $("#game-saved-panel").hide();
}

function hideLoadedPanel() {
  $("#game-loaded-panel").hide();
}
