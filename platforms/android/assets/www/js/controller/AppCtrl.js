angular.module('app.controller', [])
        .controller('AppCtrl', function($state, PersistenceService){
            if (! PersistenceService.inited){
                PersistenceService.init().then(function () {
                    if ($state.current.url === "/loading"){
                        $state.go("menu.dates");
                    } else {
                        $state.reload();
                    }
                });
            }
        });
