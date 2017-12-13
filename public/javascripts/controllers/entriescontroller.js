var app = angular.module('Review');

app.controller('entriesController', ['$scope', function($scope) {
    // create a message to display in our view
    $scope.message = 'Entries added';

    findAll();

    function findAll(){
        $http.get('entries')
            .success(function (data){
                $scope.entries = data;
                console.log(data);
            })
            .error(function (data){
                console.log('Error ' + data);
            });
    }

  }
  ]);
