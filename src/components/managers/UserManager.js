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

export const updateProfileDetails = (user) => {
    return fetch(`http://localhost:8000/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        },
        body: JSON.stringify(user)
    })
}

export const followerUser = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}/follow`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
}

export const unfollowUser = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}/unfollow`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
}