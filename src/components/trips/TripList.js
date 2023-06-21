import { useEffect, useState } from "react"
import { deleteTrip, filterTripsBySearch, getTrips } from "../managers/TripManager"
import "./Trips.css"
import { useNavigate } from "react-router-dom"
import trashcan from "../../images/trashcan.png"
import gear from "../../images/gear.png"

export const TripList = () => {
    const [trips, setTrips] = useState([])
    const navigate = useNavigate()
    const [ filterBySearch, setFilterBySearch ] = useState()

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

    useEffect(
        () => {
            if (filterBySearch) {
                filterTripsBySearch(filterBySearch)
                    .then((filteredData) => setTrips(filteredData))
            } else {
                getAllTrips()
            }
        }, [filterBySearch]
    )

    const formatDate = (dateString) => {
        const day = dateString.slice(5, 7)
        const month = dateString.slice(8, 10)
        const year = dateString.slice(0, 4)
        return `${day}/${month}/${year}`
    }

    return <>
    <section className="trips_action_items">
        <input
            type="text"
            className="trip_search_box"
            placeholder="Search trips..."
            onChange={(changeEvent) => {
                setFilterBySearch(changeEvent.target.value)
            }} />
        <button className="create_trip_btn" onClick={() => navigate(`/trips/create`)}>+</button>
    </section>
    <section className="trips_container">
    {
        trips.map((trip) => {
            return (
                <section className="trips_info" key={`trips--${trip.id}`}>
                    <img className="trips_image" src={trip.image_url} alt="Trip Image" onClick={() => navigate(`/trips/${trip.id}`)}/>
                        <h3 className="trips_title" onClick={() => navigate(`/trips/${trip.id}`)}>{trip.title}</h3>
                        <p className="trips_date"><b>Date:</b> {formatDate(trip.date)}</p>
                        <p className="trips_location"><b>Location:</b> {trip.location}</p>
                        <p className="trips_organizer" onClick={() => navigate(`/profile/${trip.organizer.id}`)}><b>Organizer:</b> {trip.organizer.user.username}</p>
                        {trip.may_edit_or_delete ? (<>
                        <img className="gear_icon" src={gear} onClick={() => navigate(`/trips/${trip.id}/edit`)}></img>
                        <img className="trashcan_icon" src={trashcan} onClick={() => handleDeleteTrip(trip.id)}></img>
                        </>) : ""}
                </section>
            )
        })
    }
    </section>
    </>
}