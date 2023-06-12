import { useEffect, useState } from "react"
import { deleteTrip, getTrips } from "../managers/TripManager"
import "./Trips.css"
import { useNavigate } from "react-router-dom"
import trashcan from "../../images/trashcan.png"
import gear from "../../images/gear.png"

export const TripList = () => {
    const [trips, setTrips] = useState([])
    const navigate = useNavigate()

    const getAllTrips = () => {
        getTrips()
            .then((tripsData) => {
            const sortedData = tripsData.sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
            setTrips(sortedData)
        })
    }

    useEffect(
        () => {
            getAllTrips()
        }, []
    )

    const handleDeleteTrip = (tripId) => {
        deleteTrip(tripId)
            .then(() => {
                window.confirm(`Are you sure you want to delete trip?`)
                getAllTrips()
            })
    }

    return <>
    <h1 className="trips_header">Trips & Meetups</h1>
    <section className="trips_action_items">
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
                        <img className="gear_icon" src={gear} onClick={() => navigate(`/trips/${trip.id}/edit`)}></img>
                        <img className="trashcan_icon" src={trashcan} onClick={() => handleDeleteTrip(trip.id)}></img>
                </section>
            )
        })
    }
    </section>
    </>
}