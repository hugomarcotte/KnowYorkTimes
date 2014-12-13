'use strict';

angular.module('knowyorktimesApp')
  .controller('MainCtrl', function ($scope, $http, $mdToast, $animate, $interval) {
    var secondsLeft = 120;

    $scope.score = 0;
    $scope.quizStarted = false;

    $scope.startQuiz = function() {
      $http.get('/api/questions').success(function(questions) {
        $scope.questions = questions;
        $scope.quizStarted = true;
        $scope.countDown();
      });
    }

    $scope.countDown = function() {
      $interval(function() {
        secondsLeft--;
        $scope.minLeft = Math.floor(secondsLeft / 60);
        $scope.secondsLeft = secondsLeft % 60;
        if ($scope.minLeft === 0 && $scope.secondsLeft === 0) {
          $scope.$apply();
          $scope.endQuiz();
        }
      }, 1000, 120);
    }

    $scope.endQuiz = function() {
      $scope.quizStarted = false;
      alert("the quiz is over! your score was " + $scope.score);
    };

    $scope.answerQuestion = function(questionObject) {
      if (questionObject.displayTitle === questionObject.title) {
        $mdToast.show(
          $mdToast.simple()
          .content('Your Right! + 300')
          .position('top left')
          .hideDelay(2000)
        );
        $scope.score += 300;
      } else {
        $mdToast.show(
          $mdToast.simple()
          .content('Your Wrong :( -500')
          .position('top left')
          .hideDelay(2000)
        );
        $scope.score -= 500;
      }
      currentQuestionIndex += 1;
    }

    var currentQuestionIndex = 1;
    $scope.filterQuestion = function(question) {
      return question.index === currentQuestionIndex;
    }


  });
