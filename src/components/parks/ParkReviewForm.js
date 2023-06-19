import { useState } from "react"
import "./Parks.css"
import { rateAndReviewPark } from "../managers/ParkManager"
import { useNavigate, useParams } from "react-router-dom"

export const ParkReviewForm = () => {
    const {parkId} = useParams()
    const [review, updateNewReview] = useState({
        park: 0,
        review: "",
        rating: ""
    })
    const navigate = useNavigate()

    const submissionButton = (event) => {
        event.preventDefault()

        const reviewToSendToAPI = {
            park: parseInt(parkId),
            review: review.review,
            rating: parseInt(review.rating)
        }

        return rateAndReviewPark(parkId, reviewToSendToAPI)
            .then(() => {
                alert("Your review has been submitted!")
                navigate(`/parks/${parkId}`)
            })
    }

    return <>
        <h1 className="parks_header">Review Form</h1>
        <form className="review_form">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review:</label>
                    <div className="input__field">
                        <textarea
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="How'd you like the park?"
                            value={review.review}
                            onChange={
                                (evt) => {
                                    const newReview = { ...review }
                                    newReview.review = evt.target.value
                                    updateNewReview(newReview)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="rating">Park Rating:</label>
                    <p>(1 - 5)</p>
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="number"
                            className="form-control"
                            placeholder="Rating"
                            value={review.rating}
                            min={0}
                            max={5}
                            onChange={
                                (evt) => {
                                    const newReview = { ...review }
                                    newReview.rating = evt.target.value
                                    updateNewReview(newReview)
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