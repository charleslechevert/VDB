require("dotenv").config({ path: '../.env' });
const {Client} = require("pg");
const client = new Client();
client.connect();

async function importUserData() {
    const result = await client.query(`INSERT INTO public.user(fname, lname, pseudo, password, admin) VALUES ('CARLOS','GOSHN','CARLOSG','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','false');`);
    const result2 = await client.query(`INSERT INTO public.user(fname, lname, pseudo, password,admin) VALUES ('FRANCOIS','GABARD','FRANCOISG','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','false');`); 
    const result3 = await client.query(`INSERT INTO public.user(fname, lname, pseudo,password,admin) VALUES ('MAD','MAX','MAXM','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','false');`); 
    const result4 = await client.query(`INSERT INTO public.user(fname, lname, pseudo,password,admin) VALUES ('JUSTINE','LACAZE','JUSTINEL','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','true');`);    
}; 

async function importTripData() {
    const result = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, day_trip, quantity, delay_trip, reason, user_id_) VALUES ('DIRECTE','BRÉHATINE','ARCOUEST','13:30','13/07/22',50,true,'mauvaise mer',1);`);
    const result2 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, day_trip, quantity, delay_trip, user_id_) VALUES ('TOUR','KEHOPS','BRÉHAT','17:30','13/08/22',30,false,2);`);
    const result3 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, day_trip, quantity, delay_trip, reason, user_id_) VALUES ('DIRECTE','BRÉHATINE','ARCOUEST','8:30','13/07/22',50,true,'mauvaise mer',3);`);
    const result4 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, day_trip, quantity, delay_trip, user_id_) VALUES ('DIRECTE','ENEZ VRIAD','ARCOUEST','17:30','13/08/22',30,false,4);`);
 
};

//importUserData();
importTripData();



