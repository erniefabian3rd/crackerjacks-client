import { useEffect, useState } from "react"
import "./Teams.css"
import { useParams } from "react-router-dom"
import { getTeamDetails } from "../managers/TeamManager"
import { getSelfDetails, updateProfileDetails } from "../managers/UserManager"


export const TeamDetails = () => {
    const [team, setTeam] = useState({})
    const { teamId } = useParams()
    const [user, setUser] = useState({})

    const getSelectedTeamDetails = () => {
        getTeamDetails(teamId)
            .then((teamData) => setTeam(teamData))
    }


    useEffect(
        () => {
            getSelectedTeamDetails()
        },
        [teamId]
    )

    useEffect(() => {
        getSelfDetails()
            .then(userData => setUser(userData));
    }, []
    )

    const handleMakeFavorite = () => {
        const updatedUser = { ...user, favorite_team: teamId }

        updateProfileDetails(updatedUser)
            .then(updatedUserData => {
                setUser(updatedUserData)
                window.alert("You have successfully updated your favorite team!")
                getSelfDetails()
                    .then(updatedUserDetails => {
                    setUser(updatedUserDetails)
            })
    })
}

    return <>
    <h1 className="teams_header">Team Details</h1>
    <section className="team_details">
        <img className="team_image" src={team.image_url}></img>
        <div className="team_details_info">
            <h3 className="team_name">{team.name}</h3>
            <h4 className="team_park">{team.park?.name}</h4>
            <div><b className="team_bio">Bio:</b> {team.bio}</div><br/>
            <div><b className="team_standing">Current Standing:</b> 40-26</div><br/>
            {user.favorite_team?.id === team.id
            ? <button className="favorite_btn" >Your Favorite Team</button>
            : <button className="make_favorite_btn" onClick={() => handleMakeFavorite()}>Make Team Favorite</button>
            }
        </div>
    </section>
    <section className="team_info_container">
        <div>
            <h2 className="team_standings_header">Standings:</h2>
            <div className="team_standings">
                <p>Standings here</p>
            </div>
        </div>
        <div>
            <h2 className="team_news_header">Team News:</h2>
            <div className="team_news">
                <p>News here</p>
            </div>
        </div>
        <div>
            <h2 className="team_schedule_header">Schedule:</h2>
            <div className="team_schedule">
                <p>Schedule here</p>
            </div>
        </div>
    </section>
    </>
}