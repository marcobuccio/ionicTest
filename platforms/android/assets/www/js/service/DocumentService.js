angular.module('app.service')
    .factory('DocumentService', function ($q, PersistenceService) {
        return {
            findAll: function () {
                var defer = $q.defer();
                PersistenceService.schema.Document.all().list(null, function (data) {
                    
                });
                defer.resolve([]);
                return defer.promise;
            }
        };
    });