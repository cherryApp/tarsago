importScripts('otherjs.js');

// Kapott üzenetek figyelése.
onmessage = function (message) {

  if (message.data == "doit")
    doit();

};


doit = function () {

  var d1 = new Date();
  var primes = [2],
    num = 3,
    sum = 2,
    ps = 1;
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

  // Óra megállítása.
  var d2 = new Date();
  var ido = d2.getTime() - d1.getTime();

  // Eltelt idő.
  postMessage("Eltelt idő: " + ido);

}