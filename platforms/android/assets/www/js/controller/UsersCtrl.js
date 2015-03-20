angular.module('app.controller')
        .controller('UsersCtrl', function ($scope, $state, UserService, PersistenceService, users) {
            $scope.users = users;

            $scope.add = function () {
                $state.go("menu.user");
            };

            $scope.remove = function (userId) {
                UserService.find(userId).then(function (user) {
                    if (user === null) {
                        return;
                    }
                    persistence.remove(user);
                    PersistenceService.flush().then(function () {
                        $state.reload();
                    });
                });
            };
        });