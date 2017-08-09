var app = angular.module('myApp', ["ngRoute"]);

    app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'user.html',
            controller: 'myCtrl'  
        })
        .when('/admin', {
            templateUrl: 'admin.html',
            controller: 'adminController',
            resolve: {
            // I will cause a 1 second delay
            delay: function($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 1000);
                return delay.promise;
            }
            }
        })
        .when('/user', {
            templateUrl: 'user.html',
            controller: 'userController'
        });

        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    });


    app.controller('MainController', function($scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    });

    app.controller('adminController', function($scope, $routeParams) {
        $scope.name = 'BookController';
        $scope.params = $routeParams;

        $scope.login = function(){

        }
    });
    app.controller('userController', function($scope, $routeParams) {
        $scope.name = 'userController';
        $scope.params = $routeParams;
        console.log('user Controller');
    });