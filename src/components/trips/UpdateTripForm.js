import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTripDetails, updateTripDetails } from "../managers/TripManager"

export const UpdateTripForm = () => {
    const navigate = useNavigate()
    const { tripId } = useParams()
    const [trip, setTrip] = useState({
        title: "",
        image_url: "",
        date: "",
        location: "",
        details: ""
    })

    useEffect(
        () => {
            getTripDetails(tripId)
                .then((tripData) => {
                    const tripObject = tripData
                    tripObject.title = tripData.title
                    tripObject.image_url = tripData.image_url
                    tripObject.date = tripData.date
                    tripObject.location = tripData.location
                    tripObject.details = tripData.details
                    setTrip(tripObject)
                })
        },
        [tripId]
    )

    const changeTripState = (domEvent) => {
        const copy = {...trip}
        copy[domEvent.target.name] = domEvent.target.value
        setTrip(copy)
        }

    return <>
    <h1 className="edit_trips_header">Edit Trip</h1>
    <form className="edit_trip_form">
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            name="title"
                            required autoFocus
                            type="text"
                            className="form-control-trip-title"
                            value={trip.title}
                            onChange={changeTripState} />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            name="date"
                            required autoFocus
                            type="date"
                            className="form-control-trip-date"
                            value={trip.date}
                            onChange={changeTripState} />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            name="location"
                            required autoFocus
                            type="text"
                            className="form-control-trip-location"
                            value={trip.location}
                            onChange={changeTripState} />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <textarea
                            name="details"
                            required autoFocus
                            type="text"
                            className="form-control-trip-details"
                            value={trip.details}
                            onChange={changeTripState} />
                    </div>
                </div>
            </fieldset>            
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            name="image_url"
                            required autoFocus
                            type="text"
                            className="form-control-trip-image"
                            value={trip.image_url}
                            onChange={changeTripState} />
                    </div>
                </div>
            </fieldset>

        <button className="edit_trip_submit_btn btn-save"
        onClick={evt => {
            evt.preventDefault()
            
            const updatedTrip = {
                id: tripId,
                title: trip.title,
                date: trip.date,
                location: trip.location,
                details: trip.details,
                image_url: trip.image_url
            }

            updateTripDetails(updatedTrip)
            .then(() => window.alert("Your trip has been updated")).then(() => navigate("/trips"))}}>
            Save
        </button>
    </form>
</>
}