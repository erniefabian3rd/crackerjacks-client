import { useNavigate, useParams } from "react-router-dom"
import "./UserProfile.css"
import { useEffect, useState } from "react"
import { getTeams } from "../managers/TeamManager"
import { getUserDetails, updateProfileDetails } from "../managers/UserManager"

export const UpdateProfileForm = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [teams, setTeams] = useState([])
    const [profile, setProfile] = useState({
        bio: "",
        profile_image_url: "",
        favorite_team: ""
    })

    useEffect(
        () => {
            getUserDetails(userId)
                .then((userData) => {
                    const userObject = userData
                    userObject.bio = userData.bio
                    userObject.profile_image_url = userData.profile_image_url
                    userObject.favorite_team = userData.favorite_team.id
                    setProfile(userObject)
                })
        }, [userId]
    )

    useEffect(
        () => {
            getTeams()
                .then((teamData) => setTeams(teamData))
        }, []
    )

    const changeUserState = (domEvent) => {
        const copy = {...profile}
        copy[domEvent.target.name] = domEvent.target.value
        setProfile(copy)
        }

    return <>
    <h1 className="edit_profile_header">Edit Profile</h1>
    <form className="edit_profile_form">
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <textarea
                            name="bio"
                            required autoFocus
                            type="text"
                            className="form-control-profile-bio"
                            value={profile.bio}
                            onChange={changeUserState} />
                    </div>
                </div>
            </fieldset>        
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            name="profile_image_url"
                            required autoFocus
                            type="text"
                            className="form-control-profile-image"
                            value={profile.profile_image_url}
                            onChange={changeUserState} />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                    <select 
                        value={profile.favorite_team}
                        name="favorite_team" 
                        className="form-control-profile-team"
                        onChange={changeUserState}>
                        <option value="0">Choose your favorite team...</option>
                        {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                        ))}
                    </select>
                </fieldset>

            <button className="edit_profile_submit_btn btn-save"
            onClick={evt => {
            evt.preventDefault()
            
            const updatedUser = {
                id: userId,
                profile_image_url: profile.profile_image_url,
                bio: profile.bio,
                favorite_team: parseInt(profile.favorite_team)
            }

            updateProfileDetails(updatedUser)
            .then(() => window.alert("Your profile has been updated")).then(() => navigate(`/myprofile`))}}>
            Save
        </button>
    </form>
    </>
}