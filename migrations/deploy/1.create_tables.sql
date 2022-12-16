BEGIN;

CREATE TABLE "user"
(
    id integer NOT NULL,
    fname text NOT NULL,
    lname text NOT NULL,
    email text NOT NULL,
    companyrole text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE "trip"
(
    id integer NOT NULL,
    type text NOT NULL,
    boat text NOT NULL,
    harbour text NOT NULL,
    departure timestamp without time zone NOT NULL,
    arrival timestamp without time zone,
    quantity integer NOT NULL,
    delay boolean NOT NULL,
    reason text,
    user_id_ integer NOT NULL REFERENCES "user"(id),
    PRIMARY KEY (id)
);




COMMIT;