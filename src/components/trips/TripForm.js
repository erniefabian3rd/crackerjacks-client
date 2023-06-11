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
    <h1 className="trips_header">Trip Form</h1>
        <form className="trip_form">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Trip Title:</label>
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Title of Trip"
                            // value={band.bandName}
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
                    <label htmlFor="date">Date of Trip:</label>
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="date"
                            className="form-control"
                            placeholder="Date"
                            // value={band.bandName}
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
                    <label htmlFor="location">Trip Destination:</label>
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Location"
                            // value={band.bandName}
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
                    <label htmlFor="details">Trip Details:</label>
                    <div className="input__field">
                        <textarea
                            required autoFocus
                            type="text"
                            className="form-control-band__bio"
                            placeholder="Tell others about the trip..."
                            // value={band.bio}
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
                    <label htmlFor="image_url">Trip Image:</label>
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Upload an image for the trip"
                            // value={band.members}
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
                className="btn-submit"><b>
                    Submit
                </b></button>
        </form>
    </>
}