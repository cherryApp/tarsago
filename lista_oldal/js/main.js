// Tarsago modul.
var tarsagoApp = angular.module( "tarsagoApp", [] );

// Termék kontroller.
tarsagoApp.controller( "termekController",
    ["$scope", "$http", function($scope, $http) {
        
        $scope.showingProducts = [];
        $scope.productNum = 6;
        
        // Termék ellenőrzés.
        $scope.checkProduct = function( product ) {
        
            // Látható-e a termék?
            var isQt = product.qt > 0;
            
            if ( isQt ) {
                
                if ( $scope.showingProducts.length < $scope.productNum ) {
                    product.showing = true;
                    if ( $scope.showingProducts.indexOf(product) === -1 )
                        $scope.showingProducts.push( product );                    
                }
                
            } else {
                product.showing = false;
            }
            
            // Ha nem látható, visszatérünk.
            return true;
            
        };
    
        // Lekérjük a jsont.
        $http.get( "json/products.json" )
            .success( function(d) {
                console.log( d );
                $scope.products = d;
            } )
            .error( function(d) {
                console.error( "Error: ", d );
            } );
    
} ] );
