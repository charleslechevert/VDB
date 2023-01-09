require("dotenv").config({ path: '../.env' });
const {Client} = require("pg");
const client = new Client();
client.connect();

async function importUserData() {
    const result = await client.query(`INSERT INTO public.user(fname, lname, email, password, admin) VALUES ('CARLOS','GOSHN','carlos@vdb.fr','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','false');`);
    const result2 = await client.query(`INSERT INTO public.user(fname, lname, email, password,admin) VALUES ('FRANCOIS','GABARD','francois@vdb.fr','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','false');`); 
    const result3 = await client.query(`INSERT INTO public.user(fname, lname, email,password,admin) VALUES ('MAD','MAX','mad@vdb.fr','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','false');`); 
    const result4 = await client.query(`INSERT INTO public.user(fname, lname, email,password,admin) VALUES ('JUSTINE','LACAZE','justine@vdb.fr','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','true');`);    
}; 

async function importTripData() {
    const result = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, reason, user_id_) VALUES ('DIRECTE','BRÉHATINE','ARCOUEST','13:30','14:30','13/07/22',50,true,'mauvaise mer',1);`);
    const result2 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, user_id_) VALUES ('TOUR','KEHOPS','BRÉHAT','17:30','18:30','13/08/22',30,false,2);`);
    const result3 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, reason, user_id_) VALUES ('DIRECTE','BRÉHATINE','ARCOUEST','8:30','9:30','13/07/22',50,true,'mauvaise mer',1);`);
    const result4 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, user_id_) VALUES ('DIRECTE','ENEZ','ARCOUEST','17:30','18:30','13/08/22',30,false,2);`);
    const result5 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, reason, user_id_) VALUES ('DIRECTE','BRÉHATINE','ARCOUEST','13:30','14:30','14/07/22',50,true,'mauvaise mer',1);`);
    const result6 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, user_id_) VALUES ('TOUR','KEHOPS','BRÉHAT','17:30','18:30','14/08/22',30,false,2);`);
    const result7 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, reason, user_id_) VALUES ('DIRECTE','BRÉHATINE','ARCOUEST','8:30','9:30','14/07/22',50,true,'mauvaise mer',1);`);
    const result8 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, user_id_) VALUES ('DIRECTE','ENEZ','ARCOUEST','17:30','18:30','14/08/22',30,false,2);`);
   
};

importUserData();
importTripData();



