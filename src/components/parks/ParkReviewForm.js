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
        <h1 className="review_park_header">Leave a Review</h1>
        <form className="review_form">
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <textarea
                            required autoFocus
                            type="text"
                            className="form-control-review"
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
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="number"
                            className="form-control-rating"
                            placeholder="Rating (1-5)"
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
                className="new_review_submit_btn btn-submit"><b>
                    Submit
                </b></button>
            </form>
    </>
}