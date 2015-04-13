angular.module('app.controller')
    .controller('UserCtrl',
        function ($scope, $stateParams, $state, $ionicHistory, PersistenceService, user, contacts, userContactTypes) {
            $scope.user = user;
            $scope.contacts = contacts;
            $scope.userContactTypes = userContactTypes;
            
            $scope.addContact = function(){
                var uc = new PersistenceService.schema.UserContact();
                uc.user = $scope.user;
                if ($scope.contacts === null){
                    $scope.contacts = [];
                }
                $scope.contacts.push(uc);
            };
            
            $scope.goBack = function() {
                if ($ionicHistory.backView() !== null){
                    $ionicHistory.goBack();
                } else {
                    $state.go("menu.users");
                }
            };
            
            $scope.removeContact = function(contact){
                $scope.contacts.remove(contact);
                persistence.remove(contact);
                PersistenceService.flush();
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