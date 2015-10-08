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

// Css váltása.
new cssChange( {"link":"#main-css", "select":"select[name='style-select']"} );

/*
var xhr = new XMLHttpRequest();
xhr.onload = function() {
    try {
        var r = JSON.parse(this.responseText );
        console.log( r );
    } catch( e ) {
        console.error( e );
    }
};
xhr.open( "get", "http://micro.rd.hu/in1593/prod2json.php" );
xhr.send();
*/