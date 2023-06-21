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
                getSelfDetails()
                    .then(updatedUserDetails => {
                    setUser(updatedUserDetails)
            })
    })
}

    const formatDate = (dateString) => {
        const day = dateString.slice(4, 6);
        const month = dateString.slice(6, 8);
        const year = dateString.slice(0, 4);
        return `${day}/${month}/${year}`;
    }

    return <>
    <section className="team_favorite_container">
    {user.favorite_team?.id === team.id
            ? <button className="favorite_team_btn" >Your Favorite Team</button>
            : <button className="make_favorite_team_btn" onClick={() => handleMakeFavorite()}>Make Team Favorite</button>
            }
    </section>
    <section className="team_details">
        <img className="team_image" src={team.image_url}></img>
        <div className="team_details_info">
            <h2 className="team_name">{team.name}</h2>
            <h4 className="team_park">Home Field: {team.park?.name}</h4>
            <div className="team_bio"><b>Bio:</b> {team.bio}</div><br/>
            <div className="team_division"><b>Division:</b> {team.division?.name}</div><br/>
        </div>
    </section>
    <section className="team_info_container">
        <div>
            <h3 className="team_roster_header">Roster:</h3>
            <div className="team_roster_container">
            {teamRoster.map((roster) => {
                return <>
                <section className="team_roster">
                <img src={roster.mlbHeadshot} className="player_image"/>
                <div className="player_info_container">
                    <p className="player_name"><b>{roster.longName}</b></p>
                    <p className="player_position">Position: {roster.pos}</p>
                    <p className="player_bat">Bat: {roster.bat}</p>
                    <p className="player_throw">Throw: {roster.throw}</p>
                    <p className="player_birthday">Birthday: {roster.bDay}</p>
                    <p className="player_height">Height: {roster.height}</p>
                    <p className="player_weight">Weight: {roster.weight}</p>
                    <p className="player_college">College: {roster.college}</p>
                </div>
                </section>
                </>
            })

            }
            </div>
        </div>
        <div>
            <h3 className="team_schedule_header">Upcoming Schedule:</h3>
            <div className="team_schedule_container">
                {teamSchedule.filter(game => game.gameStatus !== "Completed" && game.gameStatus !== "Postponed").map((game) => (
                <div className="team_schedule" key={game.gameID}>
                    <p className="team_schedule_teams">{game.away} @ {game.home}</p>
                    <div className="schedule_detail_container">
                        <p className="team_schedule_date">{formatDate(game.gameDate)}</p>
                        <p className="team_schedule_time">{game.gameTime}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
    </>
}