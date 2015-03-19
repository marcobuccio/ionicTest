// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'app.service', 'app.controller'])
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
    }).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('menu', {
                url: "/menu",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            }).state('menu.dates', {
                url: "/dates",
                views: {
                    'menuContent': {
                        templateUrl: "templates/dates.html",
                        controller: 'DatesCtrl'
                    }
                }
            }).state('menu.users', {
                url: "/users",
                views: {
                    'menuContent': {
                        templateUrl: "templates/users.html",
                        controller: 'UsersCtrl'
                    }
                },
                resolve: {
                    users: function (UserService) {
                        return UserService.findAll();
                    }
                }
            }).state('menu.userDetails', {
                url: "/userDetails",
                views: {
                    'menuContent': {
                        templateUrl: "templates/userDetails.html",
                        controller: 'UserDetailsCtrl'
                    }
                }
            }).state('menu.settings', {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "templates/settings.html",
                        controller: 'SettingsCtrl'
                    }
                }
            });
            
    $urlRouterProvider.otherwise('/menu/dates');
});