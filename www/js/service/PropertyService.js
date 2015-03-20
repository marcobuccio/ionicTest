angular.module('app.service')
    .factory('PropertyService', function ($q, PersistenceService) {
        return {
            find: function (name) {
                var defer = $q.defer();
                PersistenceService.schema.Property.findBy('name', name, function (data) {
                    defer.resolve(data);
                });
                return defer.promise;
            }
        };
    });