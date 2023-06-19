import { useEffect, useState } from "react"
import { getSelfDetails } from "../managers/UserManager"
import "./UserProfile.css"
import { useNavigate } from "react-router-dom"
import gear from "../../images/gear.png"
import { getParks } from "../managers/ParkManager"

export const UserProfile = () => {
    const [CJUser, setCJUser] = useState({})
    const [parks, setParks] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getSelfDetails()
                .then(userData => setCJUser(userData))
        },
        []
    )

    useEffect(
        () => {
            getParks()
                .then((parkData) => {
                    setParks(parkData)
                })
        }, []
    )

    if (!CJUser.user) {
        return null
    }

    console.log(CJUser.visited_parks)

    return <>
    <h1 className="profile_header">Profile</h1>
    <section className="profile_details">
        <img className="profile_image" src={CJUser?.profile_image_url}></img>
        <div className="profile_details_info">
            <h3 className="profile_full_name">{CJUser.user.first_name} {CJUser.user.last_name}</h3>
            <h4 className="profile_username">@{CJUser.user.username}</h4>
            <div><b className="profile_team">Favorite Team:</b> {CJUser.favorite_team.name}</div>
            <div><b className="profile_bio">Bio:</b> {CJUser.bio}</div><br/>
            <img className="gear_icon" src={gear} onClick={() => navigate(`/profile/${CJUser.id}/edit`)}></img>
        </div>
    </section>
    <h2 className="visited_parks">Visited Parks</h2>
    <section className="visited_parks_container">
    {parks.map((park) => {
        const visitedPark = CJUser.visited_parks.find(
            (visitedPark) => visitedPark.park === park.id
        )
        return (
        <div key={park.id}>
        {visitedPark
            ? <img className="visited_park_images" src={park.image_url} alt={park.name} />
            : <img className="nonvisited_park_images" src={park.image_url} alt={park.name} />
        }
        </div>
        )})}
    </section>
    </>
}