angular.module('app.controller')
    .controller('UserCtrl',
        function ($scope, $stateParams, $state, $ionicHistory, user, PersistenceService) {
            $scope.user = user;

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