angular.module('app.service')
    .factory('DateService', function ($q, PersistenceService) {
        return {
            findAll: function () {
                var defer = $q.defer();
                PersistenceService.schema.Date.all().prefetch('user').list(function (data) {
                    defer.resolve(data);
                });
                return defer.promise;
            }
        };
    });