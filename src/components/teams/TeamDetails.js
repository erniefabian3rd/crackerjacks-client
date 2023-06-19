import { useEffect, useState } from "react"
import "./Teams.css"
import { useParams } from "react-router-dom"
import { getTeamDetails } from "../managers/TeamManager"
import { getSelfDetails, updateProfileDetails } from "../managers/UserManager"
import { getTeamRoster, getTeamSchedule } from "../managers/GameManager"


export const TeamDetails = () => {
    const [team, setTeam] = useState({})
    const [teamSchedule, setSchedule] = useState([])
    const [teamRoster, setRoster] = useState([])
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

    useEffect(() => {
        getTeamSchedule(teamId)
            .then((scheduleData) => {
                setSchedule(scheduleData.body.schedule)
            })
    }, [teamId]
    )

    useEffect(() => {
        getTeamRoster(teamId)
            .then((rosterData) => {
                console.log(rosterData)
                setRoster(rosterData.body.roster)
            })
    }, [teamId]
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
            <div className="team_division">{team.division?.name}</div>
            <div><b className="team_standing">Current Standing:</b> 40-26</div><br/>
            {user.favorite_team?.id === team.id
            ? <button className="favorite_btn" >Your Favorite Team</button>
            : <button className="make_favorite_btn" onClick={() => handleMakeFavorite()}>Make Team Favorite</button>
            }
        </div>
    </section>
    <section className="team_info_container">
        <div>
            <h2 className="team_roster_header">Roster:</h2>
            <div className="team_roster team-scrollable-box">
            {teamRoster.map((roster) => {
                return <>
                <img src={roster.mlbHeadshot} />
                <p>{roster.longName}</p>
                <p>Position: {roster.pos}</p>
                <p>Bat: {roster.bat}</p>
                <p>Throw: {roster.throw}</p>
                <p>Age: {roster.age}</p>
                <p>Height: {roster.height}</p>
                <p>Weight: {roster.weight}</p>
                <p>College: {roster.college}</p>
                </>
            })

            }
            </div>
        </div>
        <div>
            <h2 className="team_schedule_header">Schedule:</h2>
            <div className="team_schedule team-scrollable-box">
                {teamSchedule.filter(game => game.gameStatus !== "Completed").map((game) => (
                <div key={game.gameID}>
                    <p>{game.away} @ {game.home}</p>
                    <p>Date: {game.gameDate}</p>
                </div>
                ))}
            </div>
        </div>
    </section>
    </>
}