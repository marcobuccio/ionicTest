angular.module('app.service', [])
    .factory('PersistenceService', function ($q) {
        persistence.store.websql.config(persistence, 'GestionaleDb2', 'PersistenceJS DB', 5 * 1024 * 1024);

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
            OrganizerType: persistence.define('organizerType', {
                name: 'TEXT',
                price: 'NUM'
            }),
            OrganizerPlace: persistence.define("organizerPlace", {
                name: 'TEXT',
                price: 'NUM'
            }),
            Organizer: persistence.define('organizer', {
                date: 'DATE',
                slotFrom: 'INT',
                slotTo: 'INT',
                note: 'TEXT'
            })
        };

        data.User.hasMany('organizers', data.Organizer, 'user');
        data.User.hasMany('userContacts', data.UserContact, 'user');
        data.UserContactType.hasMany('userContacts', data.UserContact, 'userContactType');

        data.Organizer.hasMany('users', data.User, 'organizer');
        data.OrganizerPlace.hasMany('organizers', data.Organizer, 'OrganizerPlace');
        data.OrganizerType.hasMany('organizers', data.Organizer, 'OrganizerType');

        return {
            schema: data,
            init: function () {
                var defer = $q.defer();
                persistence.schemaSync(function () {
                    defer.resolve();
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

                var ot = new data.OrganizerType();
                ot.name = "Valutazione";
                ot.price = 40;
                persistence.add(ot);

                ot = new data.OrganizerType();
                ot.name = "Trattamento";
                ot.price = 30;
                persistence.add(ot);

                var op = new data.OrganizerPlace();
                op.name = "In studio";
                op.price = 0;
                persistence.add(op);

                op = new data.OrganizerPlace();
                op.name = "Domiciliare";
                op.price = 5;
                persistence.add(op);

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
                    var o = new data.Organizer();
                    o.date = new Date();
                    o.slotFrom = 10 + i;
                    o.slotTo = 11 + i;
                    o.user = users[i];
                    o.organizerPlace = op;
                    o.organizerType = ot;
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