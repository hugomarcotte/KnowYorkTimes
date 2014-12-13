'use strict';

angular.module('knowyorktimesApp')
.controller('AdminCtrl', function ($scope, $http, Auth, User, $mdToast) {
  // Use the User $resource to fetch all users
  $scope.users = User.query();
  
    $scope.callAlchemy = function() {
    
    console.log('called api1');
    $http.post('/api/names',{}).success(function(results) {
      
      console.log('called api');
      $scope.results = results;
      
    });
  };


  $scope.questionHasImageTop = function(question) {
    return (question.type === "imageToArticle");
  }

  $scope.questionHasImageBottom = function(question) {
    return (question.type === "snippetToImage");
  }

  $scope.questionHasNoImage = function(question) {
    return (question.type === "snippetToArticle");
  }

  $scope.deleteQuestionFromDataBase = function(question) {
    // delete it from the data base
    $http.delete('api/questions/' + question._id).success(function(data) {
      console.log("deleted a thing====================================");
      console.log(data);
      $scope.questionsArray.splice($scope.questionsArray.indexOf(question), 1);
    });
  }

  $scope.destroyAllQuestions = function () {
    // delete all from database
    console.log("deleted all the things?");
    $http.delete('api/questions').success(function(data) {
      console.log("deleted ALL the things!");
      console.log(data);
      $scope.questionsArray = [];
    });

  }

  $http.get('/api/questions').success(function(questions) {
    $scope.questionsArray = questions;
  });

  $scope.quizObject = {
    date: "",
    questions: [],
    playsInfo: {}
  }

  function FlexQuestion(image, title, snippet) {
    this.image = image;
    this.displayImage = "";
    this.fakeImages = [];
    this.title = title;
    this.displayTitle = "";
    this.fakeTitles = [];
    this.snippet = snippet;
    this.displaySnippet = "";
    this.fakeSnippets = [];
    this.name = "";
    this.displaame = "";
    this.fakeNames = [];
    this.displayAnswer = "";

    this.oneRandomFakeAnswer = function(answerName){
      var fakeAnswerArrayName = "";
      if (answerName === "image") {
        fakeAnswerArrayName = "fakeImages";
      } else if (answerName === "title") {
        fakeAnswerArrayName = "fakeTitles";
      } else if (answerName === "snippet") {
        fakeAnswerArrayName = "fakeSnippets";
      }  else if (answerName === "snippet") {
        fakeAnswerArrayName = "fakeNames";
      }
      if (fakeAnswerArrayName === "fakeImages") {
        var randomIndex = Math.floor((Math.random() * (this.fakeImages.length -1)) + 0);
        this.displayImage = this.fakeImages[randomIndex];
      } else if (fakeAnswerArrayName === "fakeTitles" ){
        var randomIndex = Math.floor((Math.random() * (this.fakeTitles.length -1)) + 0);
        this.displayTitle = this.fakeTitles[randomIndex];
      } else if (fakeAnswerArrayName === "fakeSnippets"){
        var randomIndex = Math.floor((Math.random() * (this.fakeSnippets.length -1)) + 0);
        this.displaySnippet = this.fakeSnippets[randomIndex];
      } else if (fakeAnswerArrayName === "fakeNames" ) {
        var randomIndex = Math.floor((Math.random() * (this.fakeNames.length -1)) + 0);
        this.displayName = this.fakeNames[randomIndex];
      }
    };

    this.setDisplayAnswer = function(answerName) {
      var randomNumber = Math.floor((Math.random() * 2) + 0);
      if (randomNumber === 1 && answerName === "title" ) {
        this.displayTitle = this.title;
      } else if (randomNumber === 1 && answerName === "image" ) {
        this.displayImage = this.image;
      } else if (randomNumber === 1 && answerName === "snippet" ) {
        this.displaySnippet = this.snippet;
      } else if (randomNumber === 1 && answerName === "name") {

      } else {
        return this.oneRandomFakeAnswer(answerName);
      }
    };

    this.correctAnswer = function(yesorno, answerType) {
      console.log(answerType);
      this.setDisplayedAnswer(answerType);

      if (yesorno === "yes"){
        if (this.displayAnswer === this.image || this.displayAnswer === this.title || this.displayAnswer === this.snippet || this.displayAnswer === this.name) {
          alert("you are correct");
        } else {
          alert("you soooo wrong!!!!!!!!");
        }
      } else if (yesorno === "no") {
        if (this.displayAnswer === this.image || this.displayAnswer === this.title || this.displayAnswer === this.snippet || this.displayAnswer === this.name) {
          alert("you soooo wrong!!!!!!!!");
        } else {
          alert("you are correct");
        }
      }
    };

    this.setDisplayedAnswer = function(answerType) {
      if (answerType === "image") {
        this.displayAnswer = this.displayImage;
      } else if (answerType === "title") {
        this.displayAnswer = this.displayTitle;
        console.log("got here");
      } else if (answerType === "snippet") {
        this.displayAnswer = this.displaySnippet;
      } else if (answerType === "name") {
        this.displayAnswer = this.displayName;
      }
    };



  }

  $scope.flexQuestionsArray = [];
  $scope.fakeImagesArray = [];
  $scope.fakeTitlesArray = [];
  $scope.fakeSnippetsArray = [];
  $scope.indexQuestion = 1;

  $scope.buildQuestions = function() {
    for (var i = 0 ; i < 5; i++) {
    $http.get('/api/names/:' + i).success(function(results) {
      var parsedRes = JSON.parse(results.body)
      var docsArray = parsedRes['response']['docs'];
      console.log(docsArray);

      console.log("-----------------------------------docsArray");
      console.log(docsArray);

      // loop over articles and create flexObjects from them, also create the fake answer arrays
      docsArray.forEach(function(articleObject) {
        if (articleObject.multimedia.length > 0 && articleObject.headline.main && articleObject.snippet ) {
          var articleImage = "http://www.nytimes.com/" + articleObject.multimedia[0].url;
          var articleTitle = articleObject.headline.main;
          var articleSnippet = articleObject.snippet;
          var newFlexQuestion = new FlexQuestion(articleImage, articleTitle, articleSnippet);
          $scope.flexQuestionsArray.push(newFlexQuestion);
          $scope.fakeImagesArray.push(articleImage);
          $scope.fakeTitlesArray.push(articleTitle);
          $scope.fakeSnippetsArray.push(articleSnippet);
        }
      });

      // loop over the just created array of flexQuestions as well as the fake answer arrays and assign the flexQuestions fakeAnswers properties
      $scope.flexQuestionsArray.forEach(function(flexQuestion) {

        // fake images
        $scope.fakeImagesArray.forEach(function(fakeImage) {
          if (flexQuestion.image !== fakeImage) {
            flexQuestion.fakeImages.push(fakeImage);
          }
        });

        // fake Titles
        $scope.fakeTitlesArray.forEach(function(fakeTitle) {
          if (flexQuestion.title !== fakeTitle) {
            flexQuestion.fakeTitles.push(fakeTitle);
          }
        });

        // fake Spippets
        $scope.fakeSnippetsArray.forEach(function(fakeSnippet) {
          if (flexQuestion.snippet !== fakeSnippet) {
            flexQuestion.fakeSnippets.push(fakeSnippet);
          }
        });

      });

      // loop over the flex questions and set there display properties
      $scope.flexQuestionsArray.forEach(function(flexQuestion) {
        flexQuestion.setDisplayAnswer("image");
        flexQuestion.setDisplayAnswer("title");
        flexQuestion.setDisplayAnswer("snippet");
        flexQuestion.setDisplayAnswer("name");
      });

      console.log("---------------------------------flexQestionsArray");
      console.log($scope.flexQuestionsArray);
      console.log("--------------------------------fakeImagesArray");
      console.log($scope.fakeImagesArray);
      console.log("--------------------------------fakeTitlesArray");
      console.log($scope.fakeTitlesArray);
      console.log("--------------------------------fakeSnippetsArray");
      console.log($scope.fakeSnippetsArray);

      $scope.flexQuestionsArray.forEach(function(question) {
        // image to article
        var obj1 = {
          "questionTop" : question.image,
          "questionBottom" : question.displayTitle,
          "questionAnswer" : question.title,
          "randomNum" : Math.random(),
          "type" : "imageToArticle",
        }

        /// snippt to article
        var obj2 = {
          "questionTop" : question.snippet,
          "questionBottom" : question.displayTitle,
          "questionAnswer" : question.title,
          "randomNum" : Math.random(),
          "type" : "snippetToArticle",
        }

        // snippet to image
        var  obj3 = {
          "questionTop" : question.snippet,
          "questionBottom" : question.displayImage,
          "questionAnswer" : question.image,
          "randomNum" : Math.random(),
          "type" : "snippetToImage",
        }

        $http.post('/api/questions', obj1).
        success(function(data) {
          console.log(data);
        }).
        error(function(err) {
          console.log(err);
        });

        $http.post('/api/questions', obj2).
        success(function(data) {
          console.log(data);
        }).
        error(function(err) {
          console.log(err);
        });

        $http.post('/api/questions', obj3).
        success(function(data) {
          console.log(data);;
        }).
        error(function(err) {
          console.log(err);
        });
      });
    $scope.flexQuestionsArray = [];
    $http.get('/api/questions').success(function(questions) {
      $scope.questionsArray = questions;
    });
  });
};
};


$scope.yesButtonClickImageToTitle = function(questionObject) {
  console.log("got to yes");
  if (questionObject.displayTitle === questionObject.title) {
    $mdToast.show(
      $mdToast.simple()
      .content('Your Right!')
      .position('bottom right')
      .hideDelay(2000)
    );
  } else {

    $mdToast.show(
      $mdToast.simple()
      .content('Your Wrong :(')
      .position('bottom right')
      .hideDelay(2000)
    );
  }
  currentQuestionIndex += 1;
}

$scope.noButtonClickImageToTitle = function(questionObject) {
  console.log("got to no");
  if (questionObject.displayTitle !== questionObject.title) {
    $mdToast.show(
      $mdToast.simple()
      .content('Your Right!')
      .position('bottom right')
      .hideDelay(2000)
    );
  } else {
    $mdToast.show(
      $mdToast.simple()
      .content('Your Wrong :(')
      .position('bottom right')
      .hideDelay(2000)
    );
  }
  currentQuestionIndex += 1;
};



$scope.yesButtonClickTitleToSnippet = function(questionObject) {
  console.log("got to yes");
  if (questionObject.displaySnippet === questionObject.snippet) {
    alert("you are correct");
    $mdToast.show(
      $mdToast.simple()
      .content('Your Right!')
      .position('bottom right')
      .hideDelay(2000)
    );
  } else {
    alert("worng");
    $mdToast.show(
      $mdToast.simple()
      .content('Your Wrong :(')
      .position('bottom right')
      .hideDelay(2000)
    );
  }
  currentQuestionIndex += 1;
}

$scope.noButtonClickTitleToSnippet = function(questionObject) {

  console.log("got to no");
  if (questionObject.displaySnippet !== questionObject.Snippet) {
    alert("your right");
    $mdToast.show(
      $mdToast.simple()
      .content('Your Right!')
      .position('bottom right')
      .hideDelay(2000)
    );
  } else {
    alert("your wrong");
    $mdToast.show(
      $mdToast.simple()
      .content('Your Wrong :(')
      .position('bottom right')
      .hideDelay(2000)
    );
  }
  currentQuestionIndex += 1;

}


$scope.yesButtonClickImageToSnippet = function(questionObject) {
  console.log("got to yes");
  if (questionObject.displaySnippet === questionObject.snippet) {
    alert("you are correct");
    $mdToast.show(
      $mdToast.simple()
      .content('Your Right!')
      .position('bottom right')
      .hideDelay(2000)
    );
  } else {
    alert("worng");
    $mdToast.show(
      $mdToast.simple()
      .content('Your Wrong :(')
      .position('bottom right')
      .hideDelay(2000)
    );
  }
  currentQuestionIndex += 1;
}




$scope.noButtonClickImageToSnippet = function(questionObject) {
  console.log("got to no");
  if (questionObject.displaySnippet !== questionObject.Snippet) {
    alert("your right");
    $mdToast.show(
      $mdToast.simple()
      .content('Your Right!')
      .position('bottom right')
      .hideDelay(2000)
    );
  } else {
    alert("your wrong");
    $mdToast.show(
      $mdToast.simple()
      .content('Your Wrong :(')
      .position('bottom right')
      .hideDelay(2000)
    );
  }
  currentQuestionIndex += 1;
}


var currentQuestionIndex = 1;
$scope.filterQuestion = function(question) {
  return question.index === currentQuestionIndex;
}


});
