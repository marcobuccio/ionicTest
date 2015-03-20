angular.module('app.controller', [])
        .controller('AppCtrl', function($state, PersistenceService){
            if (! PersistenceService.inited){
                PersistenceService.init().then(function () {
                    $state.reload();
                });
            }
        });

var errorFn = function(msg){
    console.log("ERRORE " + msg);
};