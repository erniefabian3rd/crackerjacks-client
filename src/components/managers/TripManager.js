export const getTrips = () => {
    return fetch("http://localhost:8000/trips", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

export const createTrip = (trip) => {
    return fetch("http://localhost:8000/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        },
        body: JSON.stringify(trip)
    })
        .then(res => res.json())
}
