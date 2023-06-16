import { useEffect, useState } from "react"
import { followerUser, getSelfDetails, getUserDetails, unfollowUser } from "../managers/UserManager"
import "./UserProfile.css"
import { useParams } from "react-router-dom"

export const OtherUserProfile = () => {
    const {userId} = useParams()
    const [CJUser, setCJUser] = useState({})

    const getSelectedUserDetails = () => {
        getUserDetails(userId)
            .then((userData) => {
                setCJUser(userData)
            })
    }

    useEffect(
        () => {
            getSelectedUserDetails()
        },
        [userId]
    )

    const handleFollow = (userId) => {
        followerUser(userId)
            .then(() => {
                window.alert(`You are now following ${CJUser.user.username}`)
                getSelectedUserDetails()
            })
    }

    const handleUnfollow = (userId) => {
        unfollowUser(userId)
            .then(() => {
                window.confirm(`Are you sure you want to unfollow ${CJUser.user.username}?`)
                getSelectedUserDetails()
            })
    }

    return <>
    <h1 className="profile_header">Profile</h1>
    {CJUser.is_followed
    ? <button className="follow_btn" onClick={() => handleUnfollow(CJUser.id)}>Unfollow</button>
    : <button className="follow_btn" onClick={() => handleFollow(CJUser.id)}>Follow</button>
    }
    <section className="profile_details">
        <img className="profile_image" src={CJUser?.profile_image_url}></img>
        <div className="profile_details_info">
            <h3 className="profile_full_name">{CJUser.user?.first_name} {CJUser.user?.last_name}</h3>
            <h4 className="profile_username">@{CJUser.user?.username}</h4>
            <div><b className="profile_team">Favorite Team:</b> {CJUser.favorite_team?.name}</div>
            <div><b className="profile_bio">Bio:</b> {CJUser.bio}</div><br/>
        </div>
    </section>
    <h2 className="visited_parks">Visited Parks</h2>
    </>
}