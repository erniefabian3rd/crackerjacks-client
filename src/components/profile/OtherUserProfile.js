import { useEffect, useState } from "react"
import { followerUser, getSelfDetails, getUserDetails, unfollowUser } from "../managers/UserManager"
import "./UserProfile.css"
import { useParams } from "react-router-dom"
import { getParks } from "../managers/ParkManager"

export const OtherUserProfile = () => {
    const {userId} = useParams()
    const [CJUser, setCJUser] = useState({})
    const [parks, setParks] = useState([])

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

    useEffect(
        () => {
            getParks()
                .then((parkData) => {
                    setParks(parkData)
                })
        }, []
    )

    const handleFollow = (userId) => {
        followerUser(userId)
            .then(() => {
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
    <section className="other_users_container">
    {CJUser.is_followed
    ? <button className="following_user_btn" onClick={() => handleUnfollow(CJUser.id)}>Following</button>
    : <button className="follow_user_btn" onClick={() => handleFollow(CJUser.id)}>Follow</button>
    }
    <section className="other_profile_details">
        <img className="other_profile_image" src={CJUser?.profile_image_url}></img>
        <div className="profile_details_info">
            <h3 className="profile_full_name">{CJUser.user?.first_name} {CJUser.user?.last_name}</h3>
            <h4 className="other_profile_username">@{CJUser.user?.username}</h4>
            <div className="profile_team"><b>Favorite Team:</b> {CJUser.favorite_team?.name}</div><br/>
            <div className="profile_bio"><b>Bio:</b> {CJUser.bio}</div><br/>
        </div>
    </section>
    <h2 className="visited_parks_header">Visited Parks</h2>
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
    </section>
    </>
}