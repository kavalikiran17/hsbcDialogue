  app.controller('postController', function($scope, $http,$rootScope) {
	 
	  
	 
	  
	$scope.initi=function(){
	  $rootScope.messages=[];
	 $scope.messageSent=[];
	 $rootScope.messageRecieved={};
	 $scope.theObject ={};
	 $scope.client_id="";
	 $scope.conversationID="";
	 $scope.load=false;
	 $scope.image1=false;
	 $scope.image2=false;
	 $scope.image3=false;
	 $scope.welcome1=false;
	 $rootScope.messageBody1="";
	}
	 $scope.initi();
	 
	 var theObject = { input:"" ,client_id:$scope.client_id,conversation_id: $scope.conversationID};
	 
	 
	 $rootScope.welcome=function(){
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
	 
	 $rootScope.beforeClick=function() {
		 console.log($rootScope.messageBody1);
		 if($rootScope.messageBody1==""){
			 $rootScope.welcome();	 
			 }
		 else if(!$rootScope.messageBody1==""){
			 console.log($rootScope.messageBody1);
			 $rootScope.messageRecieved.key=$rootScope.messageBody1;
			 $rootScope.messages.push($rootScope.messageRecieved);
			 $scope.image2=true;
			 $rootScope.messageBody1="";
				$scope.load=true;
		 }
		 else if(!$scope.messageBody==""){
			 $rootScope.messageRecieved.key=$scope.messageBody;
			 $rootScope.messages.push($rootScope.messageRecieved);
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
		
	  $rootScope.sendPost = function() {
			
			$rootScope.beforeClick();
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
				$rootScope.messageRecieved.value = response.data.response[0];
				$scope.load=false;
				$scope.image3=true;
			//	$scope.messages.push($scope.messageRecieved);
				$rootScope.messageRecieved={};
				
			}, function(response) {
				//fail case
				$rootScope.message = response;
			});

		  };
       
    });