import React, { useState } from 'react';

export function Tripform(props) {

    //pre-fill the current day
    const currentDate = new Date().toISOString().substring(0, 10);

    //pre-fill the current date
    const currentTime = new Date()
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const currentHours = `${hours}:${minutes}`;

    //5 min step for departure or arrival
    
    

    
        const [boat, setBoat] = useState('Bréhatine');
        const [type_trip, setType_trip] = useState('Directe');
        const [harbour, setHarbour] = useState('Arcouest');
        const [quantity, setQuantity] = useState('');
        const [day_trip, setDay_trip] = useState(currentDate);
        const [departure, setDeparture] = useState(currentHours);
        const [arrival, setArrival] = useState(undefined);
        const [delay_trip, setDelay_Trip] = useState('false');
        const [reason, setReason] = useState(undefined);

        /*function fiveMinutes(data) {
            let hours = parseInt(data.slice(0,2))
            let minutes = parseInt(data.slice(3))
            console.log(minutes)
            if (minutes % 5 === 1 || minutes % 5 === 2) {
                console.log('ok')
                minutes = minutes - (minutes % 5)
            } else if (minutes % 5 === 3 || minutes % 5 === 4) {
                minutes = minutes + 5 - (minutes % 5)
                if (minutes === 60) {
                    minutes = 0
                    hours = hours + 1
                }
                if (hours === 24) {
                    hours = '00'
               }
            } 
            if (minutes<10) {
                minutes = '0' + minutes
            }
            if (hours<10) {
                hours = '0' + hours
            }
            return `${hours}:${minutes}`
        }*/

        const handleSubmit = (e) => {
            e.preventDefault();
            //const departure = fiveMinutes(departure)
            //const arrival = fiveMinutes(arrival)
            const user_id_ = 1
            const trip = {boat, type_trip, harbour,quantity,day_trip,departure,arrival,delay_trip,reason, user_id_};
            console.log(JSON.stringify(trip))
            fetch('http://localhost:5000/api/trips', {
                method : 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(trip)
            })
            .then(response => response.json())
            .then(trip => console.log(trip))
            .catch(error => console.error(error));
        }   

    return(
        
        <section className="tripform">
            <div className="tripform__title--container">
                <img src="../images/ship.png" className='tripform__logo' alt=''></img>
                <h2 className="tripform__title">{props.title} une traversée</h2>
            </div>
            
            <form className="tripform__form" method='post ' onSubmit={handleSubmit}>
                <label className="tripform__label">Bateau</label> 
                <select name="boat" id="boat" className="tripform__select" value={boat} onChange={(event) => setBoat(event.target.value)}>
                    <option className="tripform__option" value="Bréhatine">Bréhatine</option>
                    <option className="tripform__option" value="Enez">Enez</option>
                    <option className="tripform__option" value="Kerpont">Kerpont</option>
                    <option className="tripform__option" value="Cupidon">Cupidon</option>
                    <option className="tripform__option" value="Kehops">Kehops</option>
                </select>
                <label className="tripform__label">Type de traversée</label>
                <select name="type_trip" id="type_trip" value={type_trip} onChange={(event) => setType_trip(event.target.value)} className="tripform__select">
                    <option className="tripform__option" value="Directe">Directe</option>
                    <option className="tripform__option" value="Tour de l'île">Tour de l'île</option>
                    <option className="tripform__option" value="Extérieur">Extérieur</option>
                    <option className="tripform__option" value="Affrêtement">Affrêtement</option>
                </select>
                <label className="tripform__label">Port</label>
                <select name="harbour" id="harbour" value={harbour} onChange={(event) => setHarbour(event.target.value)} className="tripform__select">
                    <option className="tripform__option" value="Arcouest">Arcouest</option>
                    <option className="tripform__option" value="Bréhat">Bréhat</option>
                    <option className="tripform__option" value="Scolaire">Scolaire</option>
                    <option className="tripform__option" value="Tour">Tour</option>
                    <option className="tripform__option" value="Erquy">Erquy</option>
                    <option className="tripform__option" value="Saint Quay">Saint Quay</option>
                    <option className="tripform__option" value="Saint Quay-Binic">Saint Quay-Binic</option>
                </select>
                <label className="tripform__label">Nombre de passagers</label>
                <input type ="number" className="tripform__input--passenger" value={quantity} onChange={(event) => setQuantity(event.target.value)}></input>
                <label className="tripform__label">Jour</label>
                <input type="date"  className="tripform__hours" value={day_trip} onChange={(event) => setDay_trip(event.target.value)}></input>
                <label className="tripform__label" value='14:30'>Heure de départ</label>
                <input className="tripform__hours" type="time" id="appt" name="appt"
                    min="06:00" max="23:00" required value={departure} onChange={(event) => setDeparture(event.target.value)}></input>
                <label className="tripform__label">Heure d'arrivée</label>
                <input className="tripform__hours" type="time" id="appt" name="appt"
                    min="06:00" max="23:00" value={arrival} onChange={(event) => setArrival(event.target.value)}></input>
                <label className="tripform__label">Retard</label>
                <div>
                    <label>
                        <input type="radio" name="delay_trip" value={delay_trip} onChange={(event) => setDelay_Trip(event.target.value)}></input>
                        OUI
                    </label>
                    <label>
                        <input type="radio" name="delay_trip" value={delay_trip} defaultChecked></input>
                        NON
                    </label>
                </div>
                <label className="tripform__label">Raison du retard</label>
                <input value={reason} onChange={(event) => setReason(event.target.value)} className="tripform__input"></input>
                <input className="tripform__validate" type="submit"></input>
                
            </form>
        </section>
    ) 
}