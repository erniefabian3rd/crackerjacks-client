import { useEffect, useState } from "react"
import { getSelfDetails } from "../managers/UserManager"
import "./UserProfile.css"
import { useNavigate } from "react-router-dom"

export const UserProfile = () => {
    const [CJUser, setCJUser] = useState({})
    const navigate = useNavigate()

    useEffect(
        () => {
            getSelfDetails()
                .then(userData => setCJUser(userData))
        },
        []
    )

    if (!CJUser.user) {
        return null;
    }

    return <>
    <h1 className="profile_header">Profile</h1>
    <button className="create_post_button" onClick={() => navigate(`/posts/create`)}>Create a Post</button>
    <section className="profile_details">
        <img className="profile_image" src={CJUser?.profile_image_url}></img>
        <div className="profile_details_info">
            <h3 className="profile_full_name">{CJUser.user.first_name} {CJUser.user.last_name}</h3>
            <h4 className="profile_username">@{CJUser.user.username}</h4>
            <div><b className="profile_team">Favorite Team:</b> {CJUser.favorite_team.name}</div>
            <div><b className="profile_bio">Bio:</b> {CJUser.bio}</div><br/>
        </div>
    </section>
    <h2 className="visited_parks">Visited Parks</h2>
    </>
}