// Kapott üzenetek figyelése.
onmessage = function (message) {
  console.log(message.data);
  postMessage("Ezt kaptuk: " + message.data);
};