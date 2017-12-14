var app = angular.module('AdviceApp');

app.controller('mainController',['$scope', require('./maincontroller')]);
app.controller('entryController', ['$scope', '$location', '$http', require('./entrycontroller')]);
app.controller('entriesController',['$scope','$http', require('./entriescontroller')]);
