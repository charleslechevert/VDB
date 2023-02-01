BEGIN;

CREATE TABLE "user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    fname text NOT NULL,
    lname text NOT NULL,
    pseudo text NOT NULL UNIQUE,
    password text NOT NULL,
    admin boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE "trip"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    type_trip text NOT NULL,
    boat text NOT NULL,
    harbour text NOT NULL,
    departure time(0) NOT NULL,
    day_trip date NOT NULL,
    quantity integer NOT NULL, 
    delay_trip boolean NOT NULL,
    reason text,
    user_id_ integer NOT NULL REFERENCES "user"(id),
    PRIMARY KEY (id),
    CHECK (delay_trip OR reason IS NULL),
    CHECK (day_trip  <= NOW()),
    CHECK (type_trip IN ('DIRECTE', 'TOUR', 'EXTÉRIEUR','AFFRÊTEMENT')),
    CHECK (boat IN ('BRÉHATINE', 'ENEZ VRIAD', 'ENEZIZ','KEPHRENN','KEHOPS')),
    CHECK (harbour IN ('ARCOUEST', 'BRÉHAT', 'ERQUY','SAINT QUAY','SAINT QUAY-BINIC','TRIEUX','PARC ÉOLIEN','ROUEN'))







);




COMMIT;