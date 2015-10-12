// Tarsago modul.
var tarsagoApp = angular.module( "tarsagoApp", ["currencyModule"] );

// Eltávolítás a kosárból.
function removeFromCart( btn ) {
    
    // Termék kiválasztása.
    var termek = $( btn ).parents( ".animated-product" );
    var termekOffset = termek.offset();
    var holder = termek.parent();
    var id = termek.attr( "id" );
    
    // Beállítjuk a gyereket a termék pozíciójára és méretére.
    var body = angular.element( "body" );

    // Megkeressük az első üres helyet a kosárban.
    var target = $( ".productgrid #"+id ).first();
    var targetOffset = target.offset();

    // Animáljuk a termék-klónt.
    termek
        .css( {
            "position": "fixed",
            "top": termekOffset.top-window.scrollY+"px",
            "left": termekOffset.left+"px"        
        } )
        .appendTo( body )
        .animate({
            left: targetOffset.left,
            top: targetOffset.top-window.scrollY
            }, 1000, function() {
                target.css( "visibility", "visible" );
                holder.addClass( "empty" );
                termek.remove();
                reorderCart();
        });
}

// Kosár átrendezése.
function reorderCart() {
    
    // Kosár.
    var cart = $( ".cart" );
    var slots = cart.find( ".cart-item" );
    var products = cart.find( ".animated-product" );
    if ( products.length < 1 ) return;
    
    for ( var i = 0; i < slots.length; i++ ) {
        if ( !products[i] ) {
            $( slots[i] ).addClass( "empty" );
            return;
        }
        var pr = $( products[i] ).detach();
        $( slots[i] ).append( pr )
            .removeClass( "empty" );
    }
    
    
    
}