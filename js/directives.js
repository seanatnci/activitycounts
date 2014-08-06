var appDirectives = angular.module('myActivityDirectives', []);

appDirectives.directive('select-fix', function() {
        var directive = {};

        directive.restrict = 'E'; /* restrict this directive to elements */

        directive.link = function($scope, element, attributes) {
//element.html("This is the new content: " + $scope.firstName);
                element.removeClass("pure-form");
				element.addClass("select-reset");
        }

        return directive;
    })