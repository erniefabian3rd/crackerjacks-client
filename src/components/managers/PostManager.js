export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

export const getPostDetails = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}

export const createPost = (post) => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        },
        body: JSON.stringify(post)
    })
        .then(res => res.json())
}

export const updatePostDetails = (post) => {
    return fetch(`http://localhost:8000/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        },
        body: JSON.stringify(post)
    })
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
}

export const likePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
}

export const unlikePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}/unlike`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
}