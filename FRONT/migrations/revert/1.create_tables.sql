-- Revert vdb:1.create_tables from pg

BEGIN;

DROP TABLE trip;
DROP TABLE "user";



COMMIT;
