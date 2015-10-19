// Létehozunk egy új Workert.
var worker = new Worker("js/worker.js");

// Worker üzenetek figyelése.
worker.onmessage = function (message) {
  console.log("A worker válasza: " + message.data);
};

worker.postMessage("Hello én vagyok a main");

var d1 = new Date();

var primes = [2],
  num = 3,
  sum = 2,
  ps = 1;
doit = function () {
  while (num < 10000000) {
    prime = true
    j = 0
    totest = Math.ceil(Math.sqrt(num))
    while (totest >= primes[j]) {
      if (num % primes[j] == 0) {
        prime = false
      }
      j++
    }
    if (prime == true) {
      primes.push(num)
      sum += num
      ps++
    }
    num += 2
  }
}
doit();

// Óra megállítása.
var d2 = new Date();

// Eltelt idő.
console.log("Eltelt idő: " + (d2.getTime() - d1.getTime()));

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