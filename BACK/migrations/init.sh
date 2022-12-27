# 0. Je prends l'identité de spedata

export PGUSER=spedata

# 1.initialisation de la BDD

# 1.1 Je supprime le user s'il existe et la BDD
dropdb vdb
dropuser admin_vdb

# 1.2 Création du user et de la BDD

psql -f init_db.sql -d postgres

# 2.initialisation de sqitch

# 2.1 j'efface le sqitch.plan

rm sqitch.plan

# 2.2 je lance l'inistialisation
sqitch init vdb --engine pg
