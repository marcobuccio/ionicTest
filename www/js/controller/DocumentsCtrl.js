angular.module('app.controller')
        .controller('DocumentsCtrl', function ($scope, documents) {
            $scope.documents = documents;
        });