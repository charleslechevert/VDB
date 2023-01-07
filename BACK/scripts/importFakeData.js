require("dotenv").config({ path: '../.env' });
const {Client} = require("pg");
const client = new Client();
client.connect();

async function importUserData() {
    const result = await client.query(`INSERT INTO public.user(fname, lname, email, password, admin) VALUES ('Carlos','Goshn','carlos@vdb.fr','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','true');`);
    const result2 = await client.query(`INSERT INTO public.user(fname, lname, email, password,admin) VALUES ('Francois','Gabard','francois@vdb.fr','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','false');`); 
    const result3 = await client.query(`INSERT INTO public.user(fname, lname, email,password,admin) VALUES ('Mad','Max','mad@vdb.fr','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','false');`); 
    const result4 = await client.query(`INSERT INTO public.user(fname, lname, email,password,admin) VALUES ('Justine','Lacaze','justine@vdb.fr','$2a$12$gnBU0oKZu9c9B1u/TMDVPeXvykFqKfN.pPDOhqpqm/nfF7AP1OtZ2','false');`);    
}; 

async function importTripData() {
    const result = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, reason, user_id_) VALUES ('Navette','Bréhatine','Arcouest','13:30','14:30','13/07/22',50,true,'mauvaise mer',1);`);
    const result2 = await client.query(`INSERT INTO public.trip(type_trip, boat, harbour, departure, arrival, day_trip, quantity, delay_trip, reason, user_id_) VALUES ('Tour','Kehops','Bréhat','17:30','18:30','13/08/22',30,false,'',2);`);
   
};

importUserData();
importTripData();



