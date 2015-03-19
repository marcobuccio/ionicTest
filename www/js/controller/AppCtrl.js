angular.module('app.controller', [])
        .controller('AppCtrl', function(PersistenceService){
            PersistenceService.init().then(function () {
                console.log('inited');
            });
        });
