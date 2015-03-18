app.controller('DatesCtrl', function($scope, $state, $location){
    $scope.goto = function(path){
        $state.go(path);
    };
});
