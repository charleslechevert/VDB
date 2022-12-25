import React from 'react';

export function Tripline(props) {

    function date(data) {
        const date = new Date(data);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });

    }
    


        return (
            
            <div className="tripline__container">
            <div className="tripline__subcontainer">
                
                <div className="tripline__subsubcontainer">
                    <img className="tripline__info-logo" src="../images/sailor.png" alt=""></img>
                    <div className="tripline__info-text">Jean-Michel</div>
                </div>
                <div className="tripline__subsubcontainer">
                    <img className="tripline__info-logo" src="../images/ship.png" alt=""></img>
                    <div className="tripline__info-text">{props.trip.boat}</div>
                </div>
                <div className="tripline__subsubcontainer">
                    <img className="tripline__info-logo" src="../images/seat.png" alt=""></img>
                    <div className="tripline__info-text">{props.trip.quantity} passagers</div>
                </div>

            </div>

            <div className="tripline__subcontainer2">
                <div className="tripline__subsubcontainer">
                    <div className="tripline__info-text tripline__info-text-background1">{date(props.trip.day_trip)}</div>
                    <div className="tripline__info-text tripline__info-text-background2">{props.trip.harbour}</div>
                </div>
                <div className="tripline__subsubcontainer">
                    <div className="tripline__info-text tripline__info-text-background3">{props.trip.type_trip}</div>
                    <div className="tripline__info-text tripline__info-text-background4">À l'heure</div>
                </div>
                
                <div className="tripline__hours">{props.trip.departure.slice(0,5)} - {props.trip.arrival.slice(0,5)}</div>

            </div>

        </div>
        )
        

    }

    
       
    

