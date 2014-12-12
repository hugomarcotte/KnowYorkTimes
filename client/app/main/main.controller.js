'use strict';

angular.module('knowyorktimesApp')
  .controller('MainCtrl', function ($scope, $http, $mdToast, $animate) {
    $scope.awesomeThings = [];

    $http.get('/api/questions').success(function(questions) {
      console.log(questions);
      $scope.questions = questions;
    });

    $scope.names = ['Igor Minar', 'Brad Green', 'Dave Geddes', 'Naomi Black', 'Greg Weber', 'Dean Sofer', 'Wes Alvaro', 'John Scott', 'Daniel Nadasi'];
    $scope.showSimpleToast = function() {
      $mdToast.show(
        $mdToast.simple()
        .content('Your Right!')
        .position('bottom right')
        .hideDelay(2000)
      );

      currentQuestionIndex += 1;
    };

    var currentQuestionIndex =1;
    $scope.filterQuestion = function(question) {
      return question.index === currentQuestionIndex;
    }

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
