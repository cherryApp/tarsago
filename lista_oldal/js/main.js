// Tarsago modul.
var tarsagoApp = angular.module( "tarsagoApp", ["currencyModule"] );

// Termék kontroller.
tarsagoApp.controller( "termekController",
    ["$scope", "$http", function($scope, $http) {
        
        $scope.showingProducts = [];
        $scope.productNum = 9;
        
        // Osztály beállítása.
        $scope.ng_class = "col-xs-4";
        
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
        
        // Stílus beállítása.
        $scope.setStyle = function( settings ) {
             
            // Oszlopok száma.
            $scope.ng_class = "col-xs-"+( 12/settings.rowPerProduct );
            
            // Termékek száma.
            $scope.productNum = settings.productNum;
            if ( !$scope.$$phase ) $scope.$apply();
            
        };
    
        // Lekérjük a jsont.
        $http.get( "json/products.json" )
            .success( function(d) {
                console.log( d );
                
                $scope.settings = d.settings;
                $scope.setStyle( d.settings );
                $scope.products = $scope.preProcess( d.data );
            } )
            .error( function(d) {
                console.error( "Error: ", d );
            } );
    
} ] );
