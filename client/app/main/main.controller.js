'use strict';

angular.module('knowyorktimesApp')
  .controller('MainCtrl', function ($scope, $http, $mdToast, $animate) {
    $scope.awesomeThings = [];

    $http.get('/api/questions').success(function(questions) {
      console.log(questions);
      $scope.questions = questions;
    });

    $scope.showSimpleToast = function() {
      $mdToast.show(
        $mdToast.simple()
        .content('Your Right!')
        .position('bottom right')
        .hideDelay(2000)
      );
    };

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };
    //
    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };
  });
