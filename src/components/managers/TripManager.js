export const getTrips = () => {
    return fetch("http://localhost:8000/trips", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

export const getTripDetails = (tripId) => {
    return fetch(`http://localhost:8000/trips/${tripId}`, {
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

export const updateTripDetails = (trip) => {
    return fetch(`http://localhost:8000/trips/${trip.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        },
        body: JSON.stringify(trip)
    })
}

export const deleteTrip = (tripId) => {
    return fetch(`http://localhost:8000/trips/${tripId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
}

export const filterTripsBySearch = (searchTerm) => {
    return fetch(`http://localhost:8000/trips?search=${searchTerm}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}