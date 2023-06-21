import { useState } from "react"
import "./Trips.css"
import { createTrip } from "../managers/TripManager"
import { useNavigate } from "react-router-dom"

export const TripForm = () => {
    const navigate = useNavigate()
    const [trip, updateNewTrip] = useState({
        title: "",
        date: "",
        location: "",
        details: "",
        imageURL: ""
    })

    const submissionButton = (event) => {
        event.preventDefault()

        const tripToSendToAPI = {
            title: trip.title,
            date: trip.date,
            location: trip.location,
            details: trip.details,
            image_url: trip.imageURL
        }

        return createTrip(tripToSendToAPI)
            .then(() => {
                alert("Congrats on planning your trip!")
                navigate("/trips")
            })
    }

    return <>
    <h1 className="create_trips_header">Trip Form</h1>
        <form className="create_trip_form">
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control-trip-title"
                            placeholder="Title of Trip"
                            value={trip.title}
                            onChange={
                                (evt) => {
                                    const newTrip = { ...trip }
                                    newTrip.title = evt.target.value
                                    updateNewTrip(newTrip)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="date"
                            className="form-control-trip-date"
                            placeholder="Date"
                            value={trip.date}
                            onChange={
                                (evt) => {
                                    const newTrip = { ...trip }
                                    newTrip.date = evt.target.value
                                    updateNewTrip(newTrip)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control-trip-location"
                            placeholder="Location"
                            value={trip.location}
                            onChange={
                                (evt) => {
                                    const newTrip = { ...trip }
                                    newTrip.location = evt.target.value
                                    updateNewTrip(newTrip)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <textarea
                            required autoFocus
                            type="text"
                            className="form-control-trip-details"
                            placeholder="Tell others about the trip..."
                            value={trip.details}
                            onChange={
                                (evt) => {
                                    const newTrip = { ...trip }
                                    newTrip.details = evt.target.value
                                    updateNewTrip(newTrip)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control-trip-image"
                            placeholder="Upload an image for the trip"
                            value={trip.imageURL}
                            onChange={
                                (evt) => {
                                    const newTrip = { ...trip }
                                    newTrip.imageURL = evt.target.value
                                    updateNewTrip(newTrip)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            

            <button
                onClick={(clickEvent) => {
                    submissionButton(clickEvent)}}
                className="create_trip_submit_btn btn-submit"><b>
                    Submit
                </b></button>
        </form>
    </>
}