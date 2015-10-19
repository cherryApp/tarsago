// Létehozunk egy új Workert.
var worker = new Worker("js/worker.js");

// Worker üzenetek figyelése.
worker.onmessage = function (message) {
  console.log("A worker válasza: " + message.data);
};

worker.postMessage("doit");

// Json lekérése.
var xhr = new XMLHttpRequest();
xhr.onload = function (e) {

  // Óra indítása.
  var d1 = new Date();

  var products = e.target.response;
  products = JSON.parse(products);
  var usables = [];
  var cnt = 0;
  for (var k in products) {
    if (products[k].usable_rj > 0.9) {
      usables.push(products[k]);
    }
    cnt++;
  }
  console.log(usables);

  // Óra megállítása.
  var d2 = new Date();

  // Eltelt idő.
  console.log("Elemek:" + cnt + ", Eltelt idő: " + (d2.getTime() - d1.getTime()));

}
xhr.open("get", "json/test.json");
xhr.send();