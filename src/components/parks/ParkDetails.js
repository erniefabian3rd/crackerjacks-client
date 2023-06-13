import { useEffect, useState } from "react"
import "./Parks.css"
import { useParams } from "react-router-dom"
import { getParkDetails } from "../managers/ParkManager"
import star from "../../images/star.png"

export const ParkDetails = () => {
    const [park, setPark] = useState({})
    const { parkId } = useParams()

    useEffect(
        () => {
            getParkDetails(parkId)
                .then(parkData => setPark(parkData))
        },
        [parkId]
    )

    return <>
        <h1 className="parks_header">Park Details</h1>
        <button className="leave_review_btn">Leave a Review</button>
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
        </div>
        <div className="rating_container">
            <h2 className="park_rating_header">Average Rating:</h2>
            <div className="star_container">
                <img className="star_icon" src={star}/>
                <img className="star_icon" src={star}/>
                <img className="star_icon" src={star}/>
                <img className="star_icon" src={star}/>
                <img className="star_icon" src={star}/>
            </div>
        </div>
    </section>
    </>
}