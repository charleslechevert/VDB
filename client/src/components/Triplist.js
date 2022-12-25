
import  { Tripline } from "../components/Tripline"
import React from 'react';



export function Triplist() {

    
    const [tripsData, setTripsData] = React.useState(null)


    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("http://localhost:5000/api/trips")
            const data = await res.json()
            setTripsData(data)
        }
        getMemes()
    }, [])

    console.log(tripsData)
    


    

    return (
        <section className="triplist">
            <div>
            <div className="tripform__title--container">
                <img src="../images/ship.png" className='tripform__logo' alt=''></img>
                <h2 className="tripform__title">Historique</h2>
            </div> {tripsData && tripsData.map((trip) => {
                return <Tripline key={trip.id} trip={trip} />

        })}</div>
        </section>
    )
    }