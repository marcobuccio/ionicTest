angular.module('app.service', [])
    .factory('PersistenceService', function ($q) {
        persistence.store.websql.config(persistence, 'GestionaleDb', 'PersistenceJS DB', 5 * 1024 * 1024);

        var data = {
            Property: persistence.define('property', {
                name: 'TEXT',
                value: 'TEXT'
            }),
            User: persistence.define('user', {
                name: "TEXT",
                surname: "TEXT",
                img: "TEXT",
                birthDate: "DATE"
            }),
            UserContact: persistence.define('userContact', {
                name: 'TEXT',
                surname: 'TEXT',
                eMail: 'TEXT',
                tel: 'TEXT'
            }),
            UserContactType: persistence.define('userContactType', {
                name: 'TEXT'
            }),
            DateType: persistence.define('dateType', {
                name: 'TEXT',
                price: 'NUM'
            }),
            DatePlace: persistence.define("datePlace", {
                name: 'TEXT',
                price: 'NUM'
            }),
            Date: persistence.define('date', {
                date: 'DATE',
                slotFrom: 'INT',
                slotTo: 'INT',
                note: 'TEXT'
            }),
            Document: persistence.define('document', {
                date: "DATE"
            })
        };

        data.User.hasMany('date', data.Date, 'user');
        data.User.hasMany('userContacts', data.UserContact, 'user');
        data.UserContactType.hasMany('userContacts', data.UserContact, 'userContactType');

        data.Date.hasMany('users', data.User, 'date');
        data.DatePlace.hasMany('date', data.Date, 'datePlace');
        data.DateType.hasMany('date', data.Date, 'dateType');

        return {
            inited: false,
            schema: data,
            init: function () {
                var that = this;
                
                var defer = $q.defer();
                persistence.schemaSync(function () {
                    data.Property.findBy("name", "db_version", function(data){
                        if (data === null){
                            that.insertTestData();
                        }
                        inited = true;
                        defer.resolve(); 
                    });
                });    
                return defer.promise;
            },
            reset: function () {
                var defer = $q.defer();
                persistence.reset(function () {
                    defer.resolve();
                });
                return defer.promise;
            },
            insertTestData: function () {
                var ct = new data.UserContactType();
                ct.name = 'Padre';
                persistence.add(ct);

                ct = new data.UserContactType();
                ct.name = 'Madre';
                persistence.add(ct);

                ct = new data.UserContactType();
                ct.name = 'Parente';
                persistence.add(ct);

                ct = new data.UserContactType();
                ct.name = 'Servizi sociali';
                persistence.add(ct);

                ct = new data.UserContactType();
                ct.name = 'Altro';
                persistence.add(ct);

                var ot = new data.DateType();
                ot.name = "Valutazione";
                ot.price = 40;
                persistence.add(ot);

                ot = new data.DateType();
                ot.name = "Trattamento";
                ot.price = 30;
                persistence.add(ot);

                var op = new data.DatePlace();
                op.name = "In studio";
                op.price = 0;
                persistence.add(op);

                op = new data.DatePlace();
                op.name = "Domiciliare";
                op.price = 5;
                persistence.add(op);
                
                var dbVersion = new data.Property();
                dbVersion.name = "db_version";
                dbVersion.value = "1";
                persistence.add(dbVersion);

                var users = [];
                for (var i = 0; i < 4; i++) {
                    var u = new data.User();
                    u.name = "nome_" + i;
                    u.surname = "cognome_" + i;
                    u.birthDate = new Date();
                    persistence.add(u);
                    users.push(u);
                }

                var organizers = [];
                for (i = 0; i < 4; i++) {
                    var o = new data.Date();
                    o.date = new Date();
                    o.slotFrom = 10 + i;
                    o.slotTo = 11 + i;
                    o.user = users[i];
                    o.datePlace = op;
                    o.dateType = ot;
                    o.note = "Alcune note...";
                    persistence.add(o);
                    organizers.push(o);
                }

                persistence.flush();
            },
            flush: function () {
                var defer = $q.defer();
                persistence.transaction(function (tx) {
                    persistence.flush(function () {
                        defer.resolve();
                    });
                });
                return defer.promise;
            }
        };
    });