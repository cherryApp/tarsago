// Termék kontroller.
tarsagoApp.controller("termekController", ["$scope", "$http", "$timeout", function ($scope, $http, $timeout) {

    $scope.showingProducts = [];
    $scope.productNum = 9;
    $scope.popup = {};

    // Osztály beállítása.
    $scope.ng_class = "col-xs-4";

    // Termékek feldolgozása.
    $scope.preProcess = function (products) {

        // Megkeressük a készelten lévőket.
        var processed = [];
        var missing = [];
        var index = 0;
        for (var k in products) {
            index++;
            products[k].shortcode = products[k].shortcode || index;
            if (products[k].qt > 0) {
                processed.push(products[k]);
            } else {
                products[k].missing = true;
                missing.push(products[k]);
            }
        }

        // Hozzávesszük azokat amikből nincs elég.
        processed = processed.concat(missing);

        return processed.splice(0, $scope.productNum);

    };

    // Stílus beállítása.
    $scope.setStyle = function (settings) {

        // Oszlopok száma.
        $scope.ng_class = "col-xs-" + (12 / settings.rowPerProduct);

        // Termékek száma.
        $scope.productNum = settings.productNum;
        if (!$scope.$$phase) $scope.$apply();

    };

    // Lekérjük a jsont.
    $http.get("json/products.json")
        .success(function (d) {
            console.log(d);

            $scope.settings = d.settings;
            $scope.setStyle(d.settings);
            $scope.products = $scope.preProcess(d.data);
        })
        .error(function (d) {
            console.error("Error: ", d);
        });

    // Popup a rendeléshez.
    $scope.showPopup = function (product) {
        console.log(product);

        // Ellenőrzés.
        product.popupTitle = product.popupTitle || product.title;

        $scope.popup.product = product;

        angular.element("#myModal").modal("show");

    };

    // Termék kiválasztása.
    $scope.startOrder = function (popup) {

        // Ablak elrejtése.
        angular.element("#myModal").modal("hide");

        // Id megállapítása.
        var id = "product-" + popup.product.shortcode;

        // Termék kiválasztása.
        var termek = angular.element("#" + id);

        // Termék klónozása.
        var termek2 = termek.clone();

        // Megkeressük az első üres helyet a kosárban.
        var cart = angular.element(".cart");
        var target = cart.find(".cart-item.empty").first();
        if (target.length < 1) {
            alert("Maximum három termék választható.");
            return;
        }

        // Termék elrejtése.
        termek.css("visibility", "hidden");

        // Beállítjuk a gyereket a termék pozíciójára és méretére.
        var offset = termek.offset();
        var body = angular.element("body");

        var targetOffset = target.offset();

        // Animáljuk a termék-klónt.
        termek2.css({
                "width": termek.width(),
                "height": termek.height(),
                "top": offset.top - window.scrollY + "px",
                "left": offset.left + "px",
                "position": "fixed"
            })
            .addClass("animated-product")
            .appendTo(body)
            .animate({
                left: targetOffset.left,
                top: targetOffset.top - window.scrollY
            }, 1000, function () {
                target.removeClass("empty")
                    .append(termek2);
                termek2.css({
                    "top": 0,
                    "left": 0,
                    "position": "inherit"
                })
            });

    };

}]);