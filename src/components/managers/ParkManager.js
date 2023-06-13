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