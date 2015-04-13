angular.module('app.controller')
        .controller('DatesCtrl', function($scope, dates){
            $scope.dates = dates;
    
            $scope.days = [];
            
            function getMonday(d) {
                d = new Date(d);
                var day = d.getDay(),
                    diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
                return new Date(d.setDate(diff));
            }
            
            var now = new Date();
            var monday = getMonday(now);
            for (var i = 0; i < 8; i++){
                var date = new Date(monday);
                date.setDate(monday.getDate() + i);
                
                var slots = [];
                for (var j = 8; j <= 22; j++){
                    var slotDate = new Date(date);
                    slotDate.setHours(j);
                    slotDate.setMinutes(0);
                    slotDate.setSeconds(0);
                    slots.push({
                        date: slotDate
                    });
                }
                
                $scope.days.push({
                   date: date,
                   slots: slots
                });
            }
            
            console.log('qui');
            console.log($scope.slots);
        });
