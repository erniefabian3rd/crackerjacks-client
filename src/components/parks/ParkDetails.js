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
        <h1 className="parks_header">Park Details</h1>
        <button className="leave_review_btn" onClick={() => navigate(`/parks/${park.id}/review`)}>Leave a Review</button>
        {park.is_visited === true
        ? <button className="mark_visited_btn" onClick={() => handleUnmarkingAsVisited(park.id)}>Visited</button>
        : <button className="mark_visited_btn" onClick={() => handleMarkingAsVisited(park.id)}>Mark as Visited</button>
        }
        <section className="park_details">
        <img className="park_image" src={park.image_url}></img>
        <div className="park_details_info">
            <h3 className="park_name">{park.name}</h3>
            <h4 className="park_team">{park.home_team?.name}</h4>
            <div><b className="park_location">Location:</b> {park.location}</div><br/>
            <div><b className="park_bio">Bio:</b> {park.bio}</div><br/>
            <div><b className="park_capacity">Capacity:</b> {park.capacity}</div><br/>
        </div>
    </section>
    <section className="park_review_container">
        <div>
            <h2 className="park_review_header">Reviews:</h2>
            {park.park_reviews && park.park_reviews.map((review) => {
                return <div className="park_reviews" key={review.id}>
                    <p>{review.review}</p>
                    </div>
            })}
        </div>
        <div className="rating_container">
            <h2 className="park_rating_header">Average Rating:</h2>
            <div className="star_container">
                {handleStarRating(park)}
            </div>
        </div>
    </section>
    </>
}