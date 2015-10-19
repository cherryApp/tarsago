$(document).ready(function () {

  // Új socket.
  window.socket = io("http://127.0.0.1:3220");

  // Üzenetek figyelése.
  window.socket.on("serverChat", function (data) {
    console.log(data);
    var area = document.querySelector("#show-message");
    var value = area.value;
    data = JSON.parse(data);
    area.value += "\n" + data.name + ": " + data.message;
  });

});

// Üzenet küldése.
function sendChatMessage() {
  var input = document.querySelector("#chat-input");
  var client = document.querySelector("#client");
  var nev = client.value;
  var message = input.value;
  var data = JSON.stringify({
    "name": nev,
    "message": message
  });
  window.socket.emit("chat", data);
};