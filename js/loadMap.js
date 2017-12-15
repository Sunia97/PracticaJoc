var token = "fa8a1b5b-55ff-4f03-b5f9-be0a95e713e2";
var slot = "nueva";

/*Cargrega mapa de nivell*/
function loadMap() {
  //var mapa = [][];
  //readTextFile("src/mapa-2.txt");
  readFile();
}

function readFile () {
  ajax.request("http://puigpedros.salleurl.edu/pwi/pac4/token/" + token + "/slot/" + slot);
}

//Ajax asincron
var ajax = {
  request: function (url) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", reqListener);
  xhr.open("POST", url, "src/mapa-2.txt");
  xhr.send();
  }
};

function reqListener () {
  var items = JSON.parse (this.responseText).items;
  alert (items);
}
