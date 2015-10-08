// Egyjegyű számok kétjegyűvé alakítása.
Number.prototype.toDoubleChar = function() {
  if ( this < 10 && this > -10 ) {
    return "0"+this;
  }
  return ""+this;
}

// Egyedi dátum generálása mysql számára.
var d = new Date();
Date.prototype.mysql = function() {
  return this.getFullYear()+"-"+(this.getMonth()+1).toDoubleChar()+"-"+this.getDate().toDoubleChar();
}