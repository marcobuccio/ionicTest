angular.module('app.controller')
    .controller('UserCtrl',
        function ($scope, $stateParams, $state, $ionicHistory, PersistenceService, user, contacts) {
            $scope.user = user;
            $scope.contacts = contacts;
            
            $scope.addContact = function(){
                var uc = new PersistenceService.schema.UserContact();
                uc.user = $scope.user;
                if ($scope.contacts === null){
                    $scope.contacts = [];
                }
                $scope.contacts.push(uc);
            };
            
            $scope.goBack = function() {
                $ionicHistory.goBack();
            };
            
            $scope.persist = function () {
                if ($stateParams.userId === '') {
                    persistence.add($scope.user);
                }

                PersistenceService.flush().then(function () {
                    $state.go("menu.users");
                });
            };
        });