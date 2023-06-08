export const getTeams = () => {
    return fetch("http://localhost:8000/teams")
        .then(response => response.json());
};