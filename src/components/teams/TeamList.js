import { useEffect, useState } from "react"
import "./Teams.css"
import { getTeams } from "../managers/TeamManager"
import { useNavigate } from "react-router-dom"

export const TeamList = () => {
    const [teams, setTeams] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getTeams()
                .then((teamsData) => setTeams(teamsData))
        }, []
    )

    return <>
    <h1 className="teams_header">MLB Teams</h1>
    <section className="teams_container">
    {
        teams.map((team) => {
            return (
                <div className="teams_info" key={`teams--${team.id}`}>
                    <img className="teams_image" src={team.image_url} alt="Team Logo" onClick={() => navigate(`/teams/${team.id}`)}/>
                    <div className="teams_text">
                        <h3 className="teams_name" onClick={() => navigate(`/teams/${team.id}`)}>{team.name}</h3>
                        <p className="teams_location">{team.park.name}</p>
                    </div>
                </div>
            )
        })
    }
    </section>

    </>
}