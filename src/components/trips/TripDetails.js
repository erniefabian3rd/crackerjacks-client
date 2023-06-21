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


    const formatDate = (dateString) => {
        if(dateString) {
        const day = dateString.slice(5, 7)
        const month = dateString.slice(8, 10)
        const year = dateString.slice(0, 4)
        return `${day}/${month}/${year}`
        } else {
            return ""
        }
    }

    return <>
        <section className="trip_details">
        <img className="trip_image" src={trip.image_url}></img>
        <div className="trip_details_info">
            <h3 className="trip_title">{trip.title}</h3><br/>
            <div className="trip_date"><b>Date:</b> {formatDate(trip.date)}</div><br/>
            <div className="trip_location"><b>Location:</b> {trip.location}</div><br/>
            <div className="trip_information"><b>Details:</b> {trip.details}</div><br/>
            <div className="trip_guest_count"><b>Guest Count:</b> {trip.guest_count}</div><br/>
        </div>
    </section>
    {trip.is_joined
    ? <button className="leave_trip_btn" onClick={() => handleLeaveTrip(trip.id)}>Joined</button>
    : <button className="join_trip_btn" onClick={() => handleJoinTrip(trip.id)}>Join Trip</button>
    }
    </>
}