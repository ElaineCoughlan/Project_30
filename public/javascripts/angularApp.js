var app = angular.module('AdviceApp', ['ngRoute']);
require('angular');
require('angular-route');
require('.controllers/index')

app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'public/pages/home.ejs',
                controller  : 'mainController'
            })

             // route for the donate page
            .when('/donate', {
                templateUrl : 'public/pages/entry.ejs',
                controller  : 'entryController'
            })

             // route for the donations page
            .when('/donations', {
                templateUrl : 'public/pages/entries.ejs',
                controller  : 'entriesController'
            });
    });


  
  


