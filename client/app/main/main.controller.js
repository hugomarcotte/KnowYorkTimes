'use strict';

angular.module('knowyorktimesApp')
  .controller('MainCtrl', function ($scope, $http, $mdToast, $animate, $interval) {
    $scope.awesomeThings = [];
    $scope.questionHasImageTop = function(question) {
      return (question.type === "imageToArticle");
    }

    $scope.questionHasImageBottom = function(question) {
      return (question.type === "snippetToImage");
    }

    $scope.questionHasNoImage = function(question) {
      return (question.type === "snippetToArticle");
    }

    $scope.startQuiz = function() {
      $http.get('/api/questions').success(function(questions) {
        $scope.questionsArray = questions;
        $scope.questionsArray.sort(function(a, b) {
          return a.randomNum - b.randomNum;
        });
      });


      $scope.countDown();
    }


    $scope.score = 0;
    var secondsLeft = 120;
    $scope.countDown = function() {
      $interval(function() {
        secondsLeft--;
        $scope.minLeft = Math.floor(secondsLeft / 60);
        $scope.secondsLeft = secondsLeft % 60;
        if ($scope.minLeft === 0 && $scope.secondsLeft === 0) {
          $scope.$apply();
          alert("the quiz is over! your score was " + $scope.score);
        }
      }, 1000, 120);
    }





    $scope.yesButtonClick = function(questionObject) {
      if (questionObject.questionBottom === questionObject.questionAnswer) {
        $mdToast.show(
          $mdToast.simple()
          .content("You're Right! + 300")
          .position('top left')
          .hideDelay(2000)
        );
        $scope.score += 300;
      } else {
        $mdToast.show(
          $mdToast.simple()
          .content("You're Wrong :( -500")
          .position('top left')
          .hideDelay(2000)
        );
        $scope.score -= 500;
      }
      currentQuestionIndex += 1;
    }

    $scope.noButtonClick = function(questionObject) {
      if (questionObject.questionBottom !== questionObject.questionAnswer) {
        $mdToast.show(
          $mdToast.simple()
          .content("You're Right! + 300")
          .position('top left')
          .hideDelay(2000)
        );
        $scope.score += 300;
      } else {
        $mdToast.show(
          $mdToast.simple()
          .content("You're Wrong :( -500")
          .position('top left')
          .hideDelay(2000)
        );
        $scope.score -= 500;
      }
      currentQuestionIndex += 1;
    }




    var currentQuestionIndex = 0;
    $scope.filterQuestion = function(question) {
    //  return question.index === currentQuestionIndex;
      return $scope.questionsArray.indexOf(question) === currentQuestionIndex;
    }


  });
