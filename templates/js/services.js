var appServices = angular.module('myActivityServices', []);


appServices.factory("LS", function($window, $rootScope) {
  angular.element($window).on('storage', function(event) {
    if (event.key === 'my-weight') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('my-weight', val);
      return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('my-weight');
    },
	removeData: function() {
      return $window.localStorage && $window.localStorage.removeItem('my-weight');
    }
  };
});

appServices.factory("ActivityStore", function($window, $rootScope) {
  angular.element($window).on('storage', function(event) {
    if (event.key === 'my-activity') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('my-activity', val);
      return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('my-activity');
    },
	removeData: function() {
      return $window.localStorage && $window.localStorage.removeItem('my-activity');
    }
  };
});
appServices.factory("MET", function() {
	var metDict = {
        walking: {low: 3.3,moderate: 4.0,high: 4.5},
        cycling: {low: 6.0,moderate: 8.0,high: 10},
        running: {low: 8,moderate: 10,high: 13.5}
		};	  
    return { 
		caloriesBurn: function(weight,activity,level,duration) { 
			var met = metDict[activity][level]
			return (weight/2.046 * met * duration/60);
			},
		activityOptions: function() {
			var option = {}
			var selectActivity = []

			for (var prop in metDict) {
				option = {};
				option['label'] = prop;
				option['value'] = prop;
				selectActivity.push(option)
			}
			return selectActivity;
		}
    }
});


