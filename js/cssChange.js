// Css kezelő osztály.
var cssChange = function( settings ) {
    
    // Konstruktor.
    this.construct = function() {
      
        // A beállítások átvétele.
        this.settings = settings;
        
        // Elemek beolvasása.
        this.link = document.querySelector( this.settings.link );
        this.select = document.querySelector( this.settings.select );
        
        // Eseménykezelők.
        this.setEvents();        
        
    };
    
    // Események beállítása.
    this.setEvents = function() {
        
        // Select figyelése.
        var self = this;
        this.select.addEventListener( "change", function(e) {
            self.handleChange(e);
        }, false );
        
    };
    
    // Módosítás kezelése.
    this.handleChange = function(e) {
        
        console.log( e.target.value );
        localStorage.userSettings = e.target.value;
        this.changeCssSource();
        
    };
    
    // Css link módosítása.
    this.changeCssSource = function() {
        
        if ( localStorage.userSettings ) {
            this.link.href = localStorage.userSettings;
        }

    };
    
    // Konstuktor.
    this.construct();
    
};