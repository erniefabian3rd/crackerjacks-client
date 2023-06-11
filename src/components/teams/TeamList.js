import { useEffect, useState } from "react"
import "./Teams.css"
import { getTeams } from "../managers/TeamManager"

export const TeamList = () => {
    const [teams, setTeams] = useState([])

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
                    <img className="teams_image" src={team.image_url} alt="Team Logo" />
                    <div className="teams_text">
                        <h3 className="teams_name">{team.name}</h3>
                        <p className="teams_location">{team.park.name}</p>
                    </div>
                </div>
            )
        })
    }
    </section>

    </>
}