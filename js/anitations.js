// elem kiválasztása
var kard = document.querySelector( ".anim-div" );

// animálás
var to = setTimeout( function() {
    clearTimeout( to );
    kard.classList.add( "second" );
}, 1000 );

// Figyeljük, hogy rákattintottak-e a képre?
var to2 = setTimeout( function() {
    clearTimeout( to2 );
    kard.classList.add( "done" );
}, 15000 );

kard.addEventListener( "click", function() {
    clearTimeout( to2 );
}, false );