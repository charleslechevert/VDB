# QUOTAS TABLE

ALTER TABLE trip
ADD COLUMN no_quota INTEGER DEFAULT 0 NOT NULL;

# RESTORE FILE

pg_dump -U admin_vdb -W -F t vdb > database_backup.tar
