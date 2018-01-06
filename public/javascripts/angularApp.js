var app = angular.module('AdviceApp', ['ngRoute']);
require('angular');
require('angular-route');
require('.controllers/index')

require('../../node_modules/bootstrap/dist/css/bootstrap.css' );
require('../../node_modules/font-awesome/css/font-awesome.css' );
require('../stylesheets/style.css');

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


  
  


