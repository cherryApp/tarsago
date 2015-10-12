// Tarsago modul.
var tarsagoApp = angular.module( "tarsagoApp", [] );

// Termék kontroller.
tarsagoApp.controller( "termekController",
    ["$scope", "$http", function($scope, $http) {
        
        $scope.showingProducts = [];
        $scope.productNum = 9;
        
        // Termékek feldolgozása.
        $scope.preProcess = function( products ) {
            
            // Megkeressük a készelten lévőket.
            var processed = [];
            var missing = [];
            for ( var k in products ) {
                if ( products[k].qt > 0 ) {
                    processed.push( products[k] );                    
                } else {
                    products[k].missing = true;
                    missing.push( products[k] );
                }
            }
            
            // Hozzávesszük azokat amikből nincs elég.
            processed = processed.concat( missing );
            
            return processed.splice( 0, $scope.productNum );
        
        };
    
        // Lekérjük a jsont.
        $http.get( "json/products.json" )
            .success( function(d) {
                console.log( d );
                $scope.products = $scope.preProcess( d );
            } )
            .error( function(d) {
                console.error( "Error: ", d );
            } );
    
} ] );
