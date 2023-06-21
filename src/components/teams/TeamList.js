import { useEffect, useState } from "react"
import "./Teams.css"
import { filterTeamsBySearch, getTeams } from "../managers/TeamManager"
import { useNavigate } from "react-router-dom"

export const TeamList = () => {
    const [teams, setTeams] = useState([])
    const navigate = useNavigate()
    const [ filterBySearch, setFilterBySearch ] = useState()

    const getAllTeams = () => {
        getTeams()
            .then((teamData) => {
                setTeams(teamData)
            })
    }

    useEffect(
        () => {
            getAllTeams()
        }, []
    )

    useEffect(
        () => {
            if (filterBySearch) {
                filterTeamsBySearch(filterBySearch)
                    .then((filteredData) => setTeams(filteredData))
            } else {
                getAllTeams()
            }
        }, [filterBySearch]
    )

    return <>
    <input type="text"
                className="team_search_box"
                placeholder="Search teams..."
                onChange={(changeEvent) => {
                    setFilterBySearch(changeEvent.target.value)
                }} />
    <section className="teams_container">
    {
        teams.map((team) => {
            return (
                <div className="teams_info" key={`teams--${team.id}`}>
                    <div className="team_image_container">
                    <img className="teams_image" src={team.image_url} alt="Team Logo" onClick={() => navigate(`/teams/${team.id}`)}/>
                    </div>
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