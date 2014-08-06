var app = angular.module('myActivity', ['ngRoute','ngAnimate',
										'myActivityControllers',
										'myActivityDirectives',
										'myActivityServices']);

app.run(function($rootScope) {
  $rootScope.name = "Activity Tracker";
});

//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
        .when('/', {
          templateUrl: 'templates/splash.htm',
          controller: 'SplashController'
		})
		.when('/AddProfile', {
        templateUrl: 'templates/add_profile.htm',
        controller: 'WeightController'
		})
		.when('/AddActivity', {
        templateUrl: 'templates/add_activity.htm',
        controller: 'ActivityController'
		})
		.when('/TotalActivity', {
        templateUrl: 'templates/total_activity.htm',
        controller: 'TotalsController'
		})
		.when('/CleanLS', {
        templateUrl: 'templates/clean_db.htm',
        controller: 'CleanController'
		})
		.when('/TestData', {
        templateUrl: 'templates/test_db.htm',
        controller: 'TestDataController'
		})
		.otherwise({
        redirectTo: '/'
		});
}]);











