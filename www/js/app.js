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
            .state('loading', {
                url: "/loading",
                templateUrl: "templates/loading.html"
            })
            .state('menu', {
                url: "/menu",
                abstract: true,
                templateUrl: "templates/menu.html"
            }).state('menu.dates', {
                url: "/dates",
                views: {
                    'menuContent': {
                        templateUrl: "templates/dates.html",
                        controller: 'DatesCtrl'
                    }
                },
                resolve: {
                    dates: function(DateService){
                        return DateService.findAll();
                    }
                }
            }).state('menu.users', {
                url: "/users",
                cache: false,
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
            }).state('menu.user', {
                url: "/user/:userId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/user.html",
                        controller: 'UserCtrl'
                    }
                },
                resolve:{
                    user: function($stateParams, PersistenceService, UserService){
                        if ($stateParams.userId !== '') {
                            return UserService.find($stateParams.userId);  
                        } else {
                            return new PersistenceService.schema.User();
                        }
                    },
                    contacts: function($stateParams, UserService){
                        if ($stateParams.userId !== '') {
                            return UserService.findContacts($stateParams.userId);  
                        } else {
                            return [];
                        }
                    }
                }
            }).state('menu.documents', {
                url: "/documents",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/documents.html",
                        controller: 'DocumentsCtrl'
                    }
                },
                resolve: {
                    documents: function (DocumentService) {
                        return DocumentService.findAll();
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
            
    $urlRouterProvider.otherwise('/loading');
});