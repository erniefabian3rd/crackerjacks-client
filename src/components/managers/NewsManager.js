export const getLeagueNews = () => {
    return fetch("http://localhost:8000/articles", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("cj_token")}`
        }
    })
        .then(response => response.json())
}