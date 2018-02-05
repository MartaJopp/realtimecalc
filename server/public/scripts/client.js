console.log('sourced');

var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);
/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    console.log('myApp -- config')
    $routeProvider
        .when('/', {
            templateUrl: '/views/templates/home.html',
            controller: 'CalculatorController as cc',
        })
        .otherwise({
            redirectTo: 'home'
        });
}) // end config