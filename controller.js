var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/playerlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.playerlist = response;
    $scope.player = "";
  });
};

refresh();

$scope.addPlayer = function() {
  console.log($scope.player);
  $http.post('/playerlist', $scope.player).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/playerlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/playerlist/' + id).success(function(response) {
    $scope.player = response;
  });
};  

$scope.update = function() {
  console.log($scope.player._id);
  $http.put('/playerlist/' + $scope.player._id, $scope.player).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.player = "";
}

}]);﻿