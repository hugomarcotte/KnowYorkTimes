'use strict';

angular.module('knowyorktimesApp')
.controller('MainCtrl', function ($scope, $http, $mdToast, $animate, $interval) {
  var secondsLeft = 120;
  var currentQuestionIndex = 0;

  $scope.score = 0;
  $scope.quizStarted = false;

  $scope.questionHasImageTop = function(question) {
    return (question.type === "imageToArticle");
  }

  $scope.questionHasImageBottom = function(question) {
    return (question.type === "snippetToImage");
  }

  $scope.questionHasNoImage = function(question) {
    return (question.type === "snippetToArticle");
  }
  $scope.awesomeThings = [];
  $scope.score = 5000;
  $scope.quizStarted = false;
  var secondsLeft = 120;

  $scope.startQuiz = function() {
    $http.get('/api/questions').success(function(questions) {
      $scope.questionsArray = questions.sort(function(a, b) {
        return a.randomNum - b.randomNum;
      });;
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
    $scope.pCTMaxScore = ($scope.score/ 10000) * 100;
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

    if(currentQuestionIndex === $scope.questions.length) {
      $scope.endQuiz();
    }
  }
  currentQuestionIndex += 1;


  $scope.filterQuestion = function(question) {
    //  return question.index === currentQuestionIndex;
    return $scope.questionsArray.indexOf(question) === currentQuestionIndex;
  }
});



