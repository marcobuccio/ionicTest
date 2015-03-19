angular.module('app.controller')
    .controller('UserCtrl',
        function ($scope, $stateParams, $state, UserService, PersistenceService) {
            $scope.user = {};

            if ($stateParams.userId !== '') {
                UserService.find($stateParams.userId).then(function (data) {
                    $scope.user = data;
                });
            } else {
                $scope.user = new PersistenceService.schema.User();
            }

            $scope.persist = function () {
                if ($stateParams.userId === '') {
                    persistence.add($scope.user);
                }

                PersistenceService.flush().then(function () {
                    $state.go("tab.users", {}, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                });
            };
        });