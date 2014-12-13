'use strict';

angular.module('knowyorktimesApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;


      if(form.$valid) {

        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          console.log($scope.user);
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
