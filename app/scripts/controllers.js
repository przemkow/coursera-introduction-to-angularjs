'use strict';
angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.dishes = menuFactory.getDishes();

  $scope.select = function(setTab) {
    $scope.tab = setTab;

    if (setTab === 2) {
      $scope.filtText = "appetizer";
    }
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };

  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
  };
}])

.controller('ContactController', ['$scope', function($scope) {

  $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

  var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

  $scope.channels = channels;
  $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', function($scope) {

  $scope.sendFeedback = function() {

    console.log($scope.feedback);

    if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
      $scope.invalidChannelSelection = true;
      console.log('incorrect');
    }
    else {
      $scope.invalidChannelSelection = false;
      $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
      $scope.feedback.mychannel="";
      $scope.feedbackForm.$setPristine();
      console.log($scope.feedback);
    }
  };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

  var dish= menuFactory.getDish(parseInt($stateParams.id,10));

  $scope.dish = dish;

}])

.controller('DishCommentController', ['$scope', function($scope) {

  $scope.newDishComment = {author:'', rating: '5', comment:'', date:''};
  var radiobuttonRates = [{value:"1", label:"1"},
                          {value:"2", label:"2"},
                          {value:"3", label:"3"},
                          {value:"4", label:"4"},
                          {value:"5", label:"5"}];
  $scope.radiobuttonRates = radiobuttonRates;

  $scope.submitComment = function () {
    $scope.newDishComment.date  = new Date().toISOString();
    $scope.dish.comments.push($scope.newDishComment);
    $scope.commentForm.$setPristine();
    $scope.newDishComment = {author:'', rating: '5', comment:'', date:''};
  };
}])

;
