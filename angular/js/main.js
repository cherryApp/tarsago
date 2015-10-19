// Főmodul.
var mymodule = angular.module("mymodule", ["ngRoute", "ngAnimate"]);

// Kofig.
mymodule.config(function ($routeProvider, $locationProvider) {

  // Beállítjuk a routing szabályokat.
  $routeProvider
    .when("/products", {
      templateUrl: "templates/products.html",
      controller: "productsCtrl"
    })
    .when("/register", {
      templateUrl: "templates/register.html",
      controller: "registerCtrl"
    })
    .when("/about", {
      templateUrl: "templates/about.html",
      controller: "aboutCtrl"
    })
    .otherwise({
      templateUrl: "templates/index.html",
      controller: "indexCtrl"
    });

});

mymodule.directive("formGroup", function () {

  function genId() {
    return "id-" + parseInt(Math.random() * 1000000, 10);
  };

  return {
    restrict: "AE",
    templateUrl: "templates/directive/form-group.html",
    scope: {
      "type": "@type",
      "label": "@label",
      "name": "@name",
      "id": "@id",
      "required": "=required",
      "model": "=ngModel"
    },
    link: function (scope, element) {
      scope.id = scope.id || genId();
      scope.validate = function (el) {
        if (scope.type === "email") {
          var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
          if (!re.test(scope.model)) {
            scope.errorMessage = "Nem jó email cím!";
          } else {
            scope.errorMessage = false;
          }
        }
      };
    }
  };
});

// Index.
mymodule.controller("indexCtrl", function ($scope) {
  $scope.cim = "Tarsago";
});
mymodule.controller("productsCtrl", function ($scope) {
  $scope.cim = "Termékek";
});
mymodule.controller("aboutCtrl", function ($scope) {
  $scope.cim = "Rólunk";
});
mymodule.controller("registerCtrl", function ($scope) {
  $scope.cim = "Regisztráció";

  // User.
  $scope.user = {};

  // Validate user.
  $scope.validate = function (name) {
    console.log(name);
    switch (name) {
    case "name":
      if ($scope.user[name] === "" || !$scope.user[name]) {
        return "Adja meg a nevét!";
      }
      break;
    case "email":
      console.log("email: ", $scope.user[name]);
      var emailErr = true;
      if ($scope.user[name] === "" || !$scope.user[name]) {
        emailErr = "Adja meg az email címét!";
      }
      if ($scope.user[name].indexOf("@") === -1) {
        emailErr = "Nem megfelelő email cím!";
      }
      return emailErr;
      break;
    }

    return true;
  };

  // Az összes adat ellenőrzése.
  $scope.validateAll = function () {
    var errors = {};
    $scope.mainError = false;
    if (Object.keys($scope.user).length < 1) {
      $scope.mainError = "Nem adott meg adatokat!";
      return {
        errors: $scope.mainError,
        valid: false
      }
    }
    for (var k in $scope.user) {
      var noerror = $scope.validate(k);
      console.log(noerror);
      if (noerror !== true)
        errors[k] = noerror;
    }
    return {
      errors: errors,
      valid: Object.keys(errors).length < 1
    }
  };

  // Mentés.
  $scope.saveUser = function () {
    var errors = $scope.validateAll();
    console.log(errors);
    if (!errors.valid) {
      console.log(errors);
      return;
    }
  }





});

// Kép módosítása.
function profilePicked(el) {
  var file = el.files[0];

  // Ellenőrizzük a típust.
  if (file.type.indexOf("image") === -1) {
    alert("Csak képet tölthet fel!");
    return;
  }

  // File tartalmának kiolvasása.
  var img = document.querySelector(".image-holder img");
  var reader = new FileReader();
  reader.onloadend = function () {
    console.log(reader.result);
    img.src = reader.result;
    sendImg(reader.result);
  }
  reader.readAsDataURL(file);


};

function sendImg(data) {
  console.log(data);
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    console.log(e);
  };
  xhr.open("post", "http://127.0.0.1:3555");
  xhr.send(data);
}