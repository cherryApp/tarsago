// Szükséges modulok.
var io = require("socket.io")();

// A socket io a 3220-as portot figyeli a sajátgépen.
io.listen(3220);

// Csatlakozik egy új kliens.
io.on("connection", function (socket) {
  console.log(socket.id);
});

console.log("Socket io listen on 3220");