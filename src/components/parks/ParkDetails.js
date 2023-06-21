import { useEffect, useState } from "react"
import "./Parks.css"
import { useNavigate, useParams } from "react-router-dom"
import { getParkDetails, markParkAsVisited, unmarkParkAsVisited } from "../managers/ParkManager"
import star from "../../images/star.png"
import filled_star from "../../images/filled-star.png"

export const ParkDetails = () => {
    const [park, setPark] = useState({})
    const { parkId } = useParams()
    const navigate = useNavigate()

    const getSelectedParkDetails = () => {
        getParkDetails(parkId)
            .then((parkData) => {
                setPark(parkData)
            })
    }

    useEffect(
        () => {
            getSelectedParkDetails()
        },
        [parkId]
    )

    const handleMarkingAsVisited = (parkId) => {
        markParkAsVisited(parkId)
            .then(() => {
                window.alert(`You have successfully marked ${park.name} as visited!`)
                getSelectedParkDetails()
            })
    }

    const handleUnmarkingAsVisited = (parkId) => {
        unmarkParkAsVisited(parkId)
            .then(() => {
                window.confirm(`Are you sure you want to unmark ${park.name} from your visited list?`)
                getSelectedParkDetails()
            })
    }

    const handleStarRating = (park) => {
        if (park.avg_rating >= 4.5) {
            return <>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            </>
        } else if (park.avg_rating >= 3.5 && park.avg_rating <= 4) {
            return <>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={star}/>
            </>
        } else if (park.avg_rating >= 2.5 && park.avg_rating <= 3) {
            return <>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={star}/>
            <img className="star_icon" src={star}/>
            </>
        } else if (park.avg_rating >= 1.5 && park.avg_rating <= 2) {
            return <>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={star}/>
            <img className="star_icon" src={star}/>
            <img className="star_icon" src={star}/>
            </>
        } else {
            return <>
            <img className="star_icon" src={filled_star}/>
            <img className="star_icon" src={star}/>
            <img className="star_icon" src={star}/>
            <img className="star_icon" src={star}/>
            <img className="star_icon" src={star}/>
            </>
        }}

    return <>
    <section className="park_buttons_container">
        <button className="leave_review_btn" onClick={() => navigate(`/parks/${park.id}/review`)}>+</button>
        {park.is_visited === true
        ? <button className="unmark_visited_btn" onClick={() => handleUnmarkingAsVisited(park.id)}>Visited</button>
        : <button className="mark_visited_btn" onClick={() => handleMarkingAsVisited(park.id)}>Mark as Visited</button>
        }
    </section>
    <section className="park_details">
        <img className="park_image" src={park.image_url}></img>
        <div className="park_details_info">
            <h2 className="park_name">{park.name}</h2>
            <h4 className="park_team">Home of the {park.home_team?.name}</h4>
            <div className="park_location"><b>Location:</b> {park.location}</div><br/>
            <div className="park_bio"><b>Bio:</b> {park.bio}</div><br/>
            <div className="park_capacity"><b>Capacity:</b> {park.capacity}</div><br/>
        </div>
    </section>
    <section className="park_review_rating_container">
        <div className="park_review_container">
            <h3 className="park_review_header">Reviews:</h3>
            {park.park_reviews && park.park_reviews.map((review) => {
                return <div className="park_reviews" key={review.id}>
                    <p className="park_review_content">{review.review}</p>
                    <p className="park_review_author"><b>-{review.user.user.username}</b></p>
                    </div>
            })}
        </div>
        <div className="park_rating_container">
            <h3 className="park_rating_header">Average Rating:</h3>
            <div className="star_container">
                {handleStarRating(park)}
            </div>
        </div>
    </section>
    </>
}