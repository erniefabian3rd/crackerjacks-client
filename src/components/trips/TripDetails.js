import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTripDetails } from "../managers/TripManager"
import "./Trips.css"

export const TripDetails = () => {
    const [trip, setTrip] = useState({})
    const { tripId } = useParams()

    useEffect(
        () => {
            getTripDetails(tripId)
                .then(tripData => setTrip(tripData))
        },
        [tripId]
    )

    return <>
    <h1 className="trips_header">Trip Details</h1>
        <section className="trip_details">
        <img className="trip_image" src={trip.image_url}></img>
        <div className="trip_details_info">
            <h3 className="trip_name">{trip.name}</h3>
            <div><b className="trip_date">Date:</b> {trip.date}</div><br/>
            <div><b className="trip_location">Location:</b> {trip.location}</div><br/>
            <div><b className="trip_information">Details:</b> {trip.details}</div><br/>
        </div>
    </section>
    <button className="join_trip_btn">Join Trip</button>
    </>
}