// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    });

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('menu', {
                url: "/menu",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            }).state('menu.main', {
                url: "/main",
                views: {
                    'menuContent': {
                        templateUrl: "templates/main.html",
                        controller: 'MenuCtrl'
                    }
                }
            }).state('menu.es_1', {
                url: "/es_1",
                views: {
                    'menuContent': {
                        templateUrl: "templates/es_1.html",
                        controller: 'Es1Ctrl'
                    }
                }
            }).state('menu.es_2', {
                url: "/es_2",
                views: {
                    'menuContent': {
                        templateUrl: "templates/es_2.html",
                        controller: 'Es1Ctrl'
                    }
                }
            });
            
    $urlRouterProvider.otherwise('/menu/main');
});


app.controller('AppCtrl', function($scope, $state){
    
});
app.controller('MenuCtrl', function($scope, $state, $location){
    $scope.goto = function(path){
        $state.go(path);
    };
});
app.controller('Es1Ctrl', function($scope){
    
});