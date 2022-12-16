BEGIN;

CREATE TABLE "user"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    fname text NOT NULL,
    lname text NOT NULL,
    email text NOT NULL UNIQUE,
    companyrole text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE "trip"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    type_trip text NOT NULL,
    boat text NOT NULL,
    harbour text NOT NULL,
    departure time(7),
    arrival time(7),
    day_trip timestamp without time zone NOT NULL,
    quantity integer NOT NULL,
    delay_trip boolean NOT NULL,
    reason text,
    user_id_ integer NOT NULL REFERENCES "user"(id),
    PRIMARY KEY (id)
);




COMMIT;