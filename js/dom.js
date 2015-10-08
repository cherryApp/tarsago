// Szelektorok.
var p = document.querySelector( "p" );
console.log( p );

// Kiolvassuk a css elérési utat a localStorage-ból és módosítjuk a linket.
function changeCssSource( href ) {
    if ( localStorage.userSettings ) {
        var css = document.querySelector( "#main-css" )
            .href = localStorage.userSettings;
    }
}


// A szelekt módosítása esetén mentjük az új kiválasztott stílust.
/* document.querySelector( "select[name='style-select']" )
    .addEventListener( "change", function(e) {
        console.log( e.target.value );
        localStorage.userSettings = e.target.value;
        changeCssSource();
    }); */