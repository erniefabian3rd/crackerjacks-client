export const getUsers = () => {
    return fetch('http://localhost:8000/users', {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })    
    .then(res => res.json())
}

export const getUserDetails = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

export const getSelfDetails = () => {
    return fetch(`http://localhost:8000/users/myprofile`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}