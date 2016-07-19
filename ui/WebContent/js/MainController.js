  angular.module('ChatApp').controller('postController', ['$rootScope','$http','$scope','myService', function($rootScope, $http,$scope,service) {
	 
	  
	 
	  
	$scope.initi=function(){
		console.log($scope.messages);
		console.log( $scope.test);
	 $scope.messageSent=[];
	 $scope.messageRecieved={};
	 $scope.theObject ={};
	 $scope.client_id="";
	 $scope.conversationID="";
	 $scope.load=false;
	 $scope.image1=false;
	 $scope.image2=false;
	 $scope.image3=false;
	 $scope.welcome1=false;
	 $scope.messageBody1=service.get();
	}
	 $scope.initi();
	 
	 var theObject = { input:"" ,client_id:$scope.client_id,conversation_id: $scope.conversationID};
	 
	 
	 $scope.welcome=function(){
	 $http({
				url : 'http://localhost:8089/bluemixCode/chat/clientVerify?clientMSG='+JSON.stringify(theObject),
				method : "GET"
			}).then(function(response) {
				console.log("response is"+response.data.response);
				
				$scope.client_id=response.data.client_id;
				$scope.conversationID=response.data.conversationID;
				$scope.image1=true;
				$scope.messageDefault =response.data.response[0];
				alert($scope.messageDefault);
			}, function(response) {
				//fail case
				$scope.message = response;
			});
	 
	 
		  $scope.checkIfEnterKeyWasPressed = function($event){
		    var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13) {
		        // Do that thing you finally wanted to do
		    	$scope.sendPost();
		    }

		  };
	 		}
	 
	 $scope.beforeClick=function() {
		 console.log($scope.messageBody1);
		 if($scope.messageBody1==""){
			 $scope.welcome();	 
			 }
		 else if(!$scope.messageBody1==""){
			 console.log($scope.messageBody1);
			 $scope.messageRecieved.key=$scope.messageBody1;
			 $scope.messages.push($scope.messageRecieved);
			 $scope.image2=true;
			 $scope.messageBody1="";
				$scope.load=true;
		 }
		 else if(!$scope.messageBody==""){
			 $scope.messageRecieved.key=$scope.messageBody;
			 $scope.messages.push($scope.messageRecieved);
			 $scope.image2=true;
				$scope.messageBody="";
				$scope.load=true;
		 }
			//alert("welcome");
			/*$scope.messageRecieved.value="";
			$scope.messageRecieved.key=$scope.messageBody;
			$scope.messages.push($scope.messageRecieved);
			$scope.messageRecieved.key="";
			$scope.load=true;*/
		};
		  
	  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
		
	  $scope.sendPost = function() {
			
			$scope.beforeClick();
			//console.log($scope.messageRecieved.key);
			/*
			 $scope.load=true;*/
			var theObject = { input:$scope.messageRecieved.key ,client_id:$scope.client_id,conversation_id: $scope.conversationID};
			$http({
				url : 'http://localhost:8089/bluemixCode/chat/clientResponse?clientMSG='+JSON.stringify(theObject),
				method : "POST"
			}).then(function(response) {
				$scope.client_id=response.data.client_id;
				$scope.conversationID=response.data.conversationID;				
				$scope.messageRecieved.value = response.data.response[0];
				$scope.load=false;
				$scope.image3=true;
			//	$scope.messages.push($scope.messageRecieved);
				$scope.messageRecieved={};
				
			}, function(response) {
				//fail case
				$scope.message = response;
			});

		  };
       
    }]);