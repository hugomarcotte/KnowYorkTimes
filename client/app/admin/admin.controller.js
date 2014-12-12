'use strict';

angular.module('knowyorktimesApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $http.get('/api/questions').success(function(questions) {
      $scope.questions = questions;
    });



    $scope.apiResults = "api Results:";
    $scope.alchamyResult = "alchamy results";

    $scope.createQuestions = function() {

      $http.post('/api/names').success(function(alchamyJSON) {

        $scope.alchamyResult = alchamyJSON;
      });

      // // Get from NY Times
      // $http.post('/newyorktimes/......').success(function(data) {
      //
      //
      //
      //   $scope.apiResults = "...";
      //
      //   // Get name from Image URL
      //
      //
      //   //SAve question to DB
      //   $http.post('/api/question/').success(function(questions) {
      //
      //     // Bind to list in the view
      //     $scope.questions = questions;
      //   });
      // });

    }


    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
