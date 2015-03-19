angular.module('starter.service')
    .factory('OrganizerService', function ($q, PersistenceService) {
        return {
            findAll: function () {
                var defer = $q.defer();
                PersistenceService.schema.Organizer.all().prefetch('user').list(function (data) {
                    defer.resolve(data);
                });
                return defer.promise;
            }
        };
    });