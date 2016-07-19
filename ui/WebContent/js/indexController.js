/**
 * 
 */
angular.module('ChatApp').controller('indexController', ['$rootScope','$http','$scope','myService',function($rootScope, $http,$scope,service) {
	console.log("enter a message");
	 
	 $scope.pass=function(){
		 console.log("inside pass");
		 console.log($scope.messageRequest);
	 
		 service.set($scope.messageRequest);
	}
}]);