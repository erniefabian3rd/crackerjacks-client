import { useEffect, useState } from "react"
import { getTrips } from "../managers/TripManager"
import "./Trips.css"

export const TripList = () => {
    const [trips, setTrips] = useState([])

    useEffect(
        () => {
            getTrips()
                .then((tripData) => setTrips(tripData))
        }, []
    )

    return <>
    <h1 className="trips_header">Trips & Meetups</h1>
    <section className="trips_container">
    {
        trips.map((trip) => {
            return (
                <section className="trips_info">
                    <img className="trips_image" src={trip.image_url} alt="Trip Image" />
                        <h3 className="trips_title">{trip.title}</h3>
                        <p className="trips_date">Date: {trip.date}</p>
                        <p className="trips_location">Location: {trip.location}</p>
                        <p className="trips_organizer">Organizer: {trip.organizer.user.username}</p>
                </section>
            )
        })
    }
    </section>
    </>
}