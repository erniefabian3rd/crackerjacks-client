import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTripDetails, joinTrip, leaveTrip } from "../managers/TripManager"
import "./Trips.css"

export const TripDetails = () => {
    const [trip, setTrip] = useState({})
    const { tripId } = useParams()

    const getSelectedTripDetails = () => {
        getTripDetails(tripId)
            .then((tripData) => {
                setTrip(tripData)
            })
    }

    useEffect(
        () => {
            getSelectedTripDetails()
        },
        [tripId]
    )

    const handleJoinTrip = (tripId) => {
        joinTrip(tripId)
            .then(() => {
                window.alert(`You have successfully joined the trip to ${trip.location}`)
                getSelectedTripDetails()
            })
    }

    const handleLeaveTrip = (tripId) => {
        leaveTrip(tripId)
            .then(() => {
                window.confirm(`Are you sure you want to leave the trip to ${trip.location}`)
                getSelectedTripDetails()
            })
    }

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
    {trip.is_joined
    ? <button className="leave_trip_btn" onClick={() => handleLeaveTrip(trip.id)}>Joined</button>
    : <button className="join_trip_btn" onClick={() => handleJoinTrip(trip.id)}>Join Trip</button>
    }
    </>
}