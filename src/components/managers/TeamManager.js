export const getTeamsForRegistration = () => {
    return fetch("http://localhost:8000/teams")
        .then(response => response.json())
}

export const getTeams = () => {
    return fetch("http://localhost:8000/teams", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

export const getTeamDetails = (teamId) => {
    return fetch(`http://localhost:8000/teams/${teamId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

export const filterTeamsBySearch = (searchTerm) => {
    return fetch(`http://localhost:8000/teams?search=${searchTerm}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

