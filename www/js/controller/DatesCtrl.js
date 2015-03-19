angular.module('app.controller')
        .controller('DatesCtrl', function($scope, $state){
            $scope.goto = function(path){
                $state.go(path);
            };
        });
