var appControllers = angular.module('myActivityControllers', []);

appControllers.controller('WeightController', ['$scope','LS', function($scope,LS) {
	var weight = LS.getData();
	if (weight == null || weight == 0 || weight === undefined || isNaN(weight)) {
		$scope.stones = 0 ;
		$scope.pounds = 0 ;
		$scope.lbs = 0;
		$scope.lbsDisplay = false;
		}
	else {
		$scope.stones = parseInt(weight / 14) ;
		$scope.pounds = (weight % 14) ;
		$scope.lbs = weight;
		$scope.lbsDisplay = false;
		}
			
	$scope.inPounds = function() {
		if (validate()) {
			$scope.lbsDisplay = true;
			$scope.lbs =  (parseInt($scope.stones * 14) + parseInt($scope.pounds));
			LS.setData($scope.lbs);
		}
		else {
			alert("invalid weight entered");
			}
	}
	validate = function() {
		if (IsNumeric($scope.pounds) && IsNumeric($scope.stones)) {
			if (parseInt($scope.pounds) < 0 || parseInt($scope.pounds) > 14 
				|| parseInt($scope.stones) < 5) 
				return false;
			else
				return true;
				}
		else
			return false;
	}
	
	IsNumeric = function(data){
		return parseFloat(data)==data;
	}
}]);
appControllers.controller('navController', ['$scope', function($scope) {
	   $scope.navShow = false;
		$scope.menuToggle = function() {
			if ( $scope.navShow)
				$scope.navShow = false;
			else
				$scope.navShow = true;
		}
}]);
appControllers.controller('SplashController', ['$scope', function($scope) {
	   
	   $scope.$on('sendMessage', function(e,message) {
		$scope.message = message;
	   });
	   
	   $scope.$broadcast('sendMessage', "Welcome");
}]);

appControllers.controller('CleanController', ['$scope','LS','ActivityStore', function($scope,LS,ActivityStore) {
	   ActivityStore.removeData();
	   LS.removeData();
	   $scope.message = 'Local Storage Removed';
}]);

appControllers.controller('TestDataController', ['$scope','LS','ActivityStore', function($scope,LS,ActivityStore) {
		ActivityStore.removeData();
		var date = new Date();
		var data = "";
		var duration = 180;
		var calories = 0;

		for (var i=0; i<12; i++){
			if (i == 0) {
				data = 	'{  "activity":	{ "exercise":' +  '"' + activity + '"' +
								',"date":' + '"' + date + '"' +
								',"duration":' + duration + 
								',"calories":' + calories + '}}'
				} else {
					data = 	'{  "activity":	{ "exercise":' +  '"' + activity + '"' +
								',"date":' + '"' + date + '"' +
								',"duration":' + duration + 
								',"calories":' + calories + '}}' + "," + data;
				}
				date.setDate(date.getDate() - 1);
		}
		ActivityStore.setData(data);
		$scope.message = 'Test Data Added';
}]);

appControllers.controller('ActivityController', ['$rootScope','$scope','$location','LS','MET','ActivityStore', function($rootScope,$scope,$location,LS,MET,ActivityStore) {
	$scope.showFields= false;
	$scope.allowInput=false;
	var weight = LS.getData();
	if (weight == null || weight == 0 || weight === undefined || isNaN(weight)) {
		$scope.error = true;
		$scope.errorMessage = "You must enter a profile before entering an activity"
		return;
		//$rootScope.$broadcast('sendMessage', "error");
		//	$location.path('/').apply();
	}
	//ActivityStore.removeData
	$scope.showFields=true;
	var activityTodate = ActivityStore.getData();
	if (activityTodate == null)
		activityTodate = "";
	else
		activityTodate = "," + activityTodate;
	$scope.duration = 180;
	$scope.level = "low";
	$scope.calories = 0;
	$scope.options = MET.activityOptions();
	
	$scope.activitySelected = $scope.options[0];
	$scope.levels = [{label: "low",value: "low"},
					{label: "moderate",value: "moderate"},
					{label: "high",value: "high"}];
	$scope.levelSelected = $scope.levels[0];
	
	$scope.calcCalories = function() {
		if (validate()) {
			var duration = parseFloat($scope.duration); // in case is a string eg. "160"
			$scope.calories = MET.caloriesBurn(weight,$scope.activitySelected.value,$scope.levelSelected.value,duration);
			$scope.caloriesDisplay = true;
			
			var date = new Date();
			var data = 	'{  "activity":	{ "exercise":' + '"' + $scope.activitySelected.value + '"' +
							',"date":' + '"' + date + '"' +
							',"duration":' + duration + 
							',"calories":' + $scope.calories +
						'}}'
			
			var dataToStore = data + activityTodate;			
			ActivityStore.setData(dataToStore);
			$scope.allowInput=true;
		}
		else {
			alert("invalid duration entered");
			}
	}
	validate = function() {
		if (IsNumeric($scope.duration)) 
			return true;
		else
			return false;
	}
	IsNumeric = function(data){
		return parseFloat(data)==data;
	}
}]);

appControllers.controller('TotalsController', ['$scope','ActivityStore', function($scope,ActivityStore) {

	var firstWD = function(date){
			var day = date.getDay() || 7;  
			if ( day !== 1 ) 
				date.setHours(-24 * (day -1));
			date.setHours(-(date.getTimezoneOffset()/60),0,0,0) //adjust for GMT
			return date;
		}
	var arr = [];
	var parsed= [];
	var headingArray = [];
	$scope.total = 0;
	var currentObj = {};
	var firstWeekDay = firstWD(new Date());
	var data = ActivityStore.getData(); // get exercise data from local storage via service
	if (data != null) {
		var arr = data.split("},");
		var firstWeekDay = firstWD(new Date());
		for (var i=0; i < arr.length; i++) {
			if (i < (arr.length - 1))
				currentObj = JSON.parse(arr[i] + '}');
			else
				currentObj = JSON.parse(arr[i]);
				if (i==0) {				
					for (var prop in currentObj.activity)
						headingArray.push(prop);
					$scope.headings = headingArray;
				}
			if ( (new Date(currentObj.activity.date)) >= firstWeekDay) {
				currentObj.activity.date = currentObj.activity.date.toString().split(' ').splice(0,3).join(' ')
				parsed.push(currentObj);
				$scope.total = $scope.total + currentObj.activity.calories;
			}
		}
		if (parsed.length == 0) { // no activity found
			$scope.tableShow = false;
		} else {			
			$scope.activity = parsed;
			$scope.tableShow = true;
		}
		
	}
	
}]);
