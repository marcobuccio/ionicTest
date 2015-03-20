angular.module('app.service')
    .factory('UserService', function ($q, PersistenceService) {
        return {
            find: function (userId) {
                var defer = $q.defer();
                PersistenceService.schema.User.findBy('id', userId, function (data) {
                    defer.resolve(data);
                });
                return defer.promise;
            },
            findContacts: function (userId) {
                var defer = $q.defer();
                PersistenceService.schema.UserContact.findBy('user', userId, function (data) {
                    defer.resolve(data);
                });
                return defer.promise;
            },
            findAll: function () {
                var defer = $q.defer();
                PersistenceService.schema.User.all().list(function (data) {
                    defer.resolve(data);
                });
                return defer.promise;
            }
        };
    });