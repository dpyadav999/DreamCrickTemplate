
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            //controller: "dashboardController",
            // templateUrl: "ac_info.html"
        })
        .when("/Mymarket", {
            // controller: "MymarketController",
            templateUrl: "Mymarket.html"
        })
        .when("/bethistory", {
            // controller: "MymarketController",
            templateUrl: "bethistory.html"
        })
         .when("/changepassword", {
            // controller: "MymarketController",
            templateUrl: "changepassword.html"
        })
          .when("/Chiphistory", {
            // controller: "MymarketController",
            templateUrl: "Chiphistory.html"
        })
           .when("/profitloss", {
            // controller: "MymarketController",
            templateUrl: "profitloss.html"
        })
            .when("/Statement", {
            // controller: "MymarketController",
            templateUrl: "Statement.html"
        })
        .otherwise({

            redirectTo: '/'

        });
        
})

//main controller start


app.controller('mainController', function($scope,$interval) {



});

