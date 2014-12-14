'use strict';

angular.module('knowyorktimesApp')
.controller('MainCtrl', function ($scope, $http, $mdToast, $animate, $interval) {
  var secondsLeft = 60;
  $scope.currentQuestionIndex = 1;

  $scope.score = 0;
  $scope.quizStarted = false;
  $scope.pCTMaxScore = 0;
  $scope.quizFinished = false;

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
      $scope.questionsArray = questions.sort(function(a, b) {
        return a.randomNum - b.randomNum;
      });;
      $scope.nbOfQuestion = questions.length;
      $scope.maxScore = questions.length * 300
      $scope.quizStarted = true;
      $scope.quizFinished = false;
      $scope.countDown();
      $scope.score = 0;
      secondsLeft = 60;
      $scope.currentQuestionIndex = 1;
      $score.pCTMaxScore = ($scope.currentQuestionIndex / $scope.questionsArray.length) * 100;
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
    $scope.quizFinished = true;
  };


  $scope.answerQuestion = function(questionObject) {
    if (questionObject.questionBottom === questionObject.questionAnswer) {

      $mdToast.show(
        $mdToast.simple()
        .content("+ 300")
        .position('top right')
        .hideDelay(1000)
        );
      $scope.score += 300;
    } else {
      $mdToast.show(
        $mdToast.simple()
        .content("You're Wrong :(")
          .position('top right')
          .hideDelay(1000)
          );
      // $scope.score -= 500;
    }
    $scope.currentQuestionIndex += 1;
    $scope.pCTMaxScore = ($scope.currentQuestionIndex / $scope.questionsArray.length) * 100 ;

    if($scope.currentQuestionIndex === $scope.questionsArray.length) {
      $scope.endQuiz();
    }
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
      // $scope.score -= 500;
    }
    $scope.currentQuestionIndex += 1;

    $scope.pCTMaxScore = ($scope.currentQuestionIndex / $scope.questions.length) * 100 ;
    if(currentQuestionIndex === $scope.questions.length) {
      $scope.endQuiz();
    }
  }


  $scope.filterQuestion = function(question) {
    //  return question.index === currentQuestionIndex;
    return $scope.questionsArray.indexOf(question) === $scope.currentQuestionIndex;
  }
});
