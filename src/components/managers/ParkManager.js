export const getParks = () => {
    return fetch("http://localhost:8000/parks", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

export const getParkDetails = (parkId) => {
    return fetch(`http://localhost:8000/parks/${parkId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

export const markParkAsVisited = (parkId) => {
    return fetch(`http://localhost:8000/parks/${parkId}/visited`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
}

export const unmarkParkAsVisited = (parkId) => {
    return fetch(`http://localhost:8000/parks/${parkId}/unvisited`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
}

export const filterParksBySearch = (searchTerm) => {
    return fetch(`http://localhost:8000/parks?search=${searchTerm}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}