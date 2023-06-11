import { useEffect, useState } from "react"
import { getTrips } from "../managers/TripManager"
import "./Trips.css"
import { useNavigate } from "react-router-dom"

export const TripList = () => {
    const [trips, setTrips] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getTrips()
                .then((tripData) => setTrips(tripData))
        }, []
    )

    return <>
    <h1 className="trips_header">Trips & Meetups</h1>
    <section className="action_items">
        <input type="text" className="trip_search_box" placeholder="Search trips..."></input>
        <button className="create_trip_btn" onClick={() => navigate(`/trips/create`)}>Create a Trip</button>
    </section>
    <section className="trips_container">
    {
        trips.map((trip) => {
            return (
                <section className="trips_info" key={`trips--${trip.id}`}>
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