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
            controllerAs:'admCtrl',
            resolve: {
                // I will cause a 1 second delay
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 500);
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

    app.controller('adminController', function($scope, $routeParams, MyService) {
        $scope.name = 'BookController';
        $scope.params = $routeParams;
        $scope.adminUser = {};
        $scope.adminRegisters = function(){
            console.log('adming registers', $scope.adminUser);
            var adminRegDefer = MyService.adminRegisters();
            adminRegDefer.then(function(data){
                console.log('adminRegistrationSuccess', data);
            },function(error){
                console.log('adminRegistration', error);
            })
        }
        $scope.adminLogsIn   = function(){

        }
    });
    app.controller('userController', function($scope, $routeParams) {
        $scope.name = 'userController';
        $scope.params = $routeParams;
        console.log('user Controller');
    });
