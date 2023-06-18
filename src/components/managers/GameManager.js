export const getTodaysGames = () => {
    const currentDate = new Date()

    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')
    
    const formattedDate = `${year}${month}${day}`
    
    return fetch(`https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBScoresOnly?gameDate=${formattedDate}`, {
        method: 'GET',
        headers:{
        'X-RapidAPI-Key': 'f909c4e0d7mshd963c2903291bd2p1a5855jsn10c8cb826218',
		'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
        }
    })
        .then(response => response.json())
}

export const getMLBTeams = () => {
    return fetch(`https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeams`, {
        method: 'GET',
        headers:{
        'X-RapidAPI-Key': 'f909c4e0d7mshd963c2903291bd2p1a5855jsn10c8cb826218',
		'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
        }
    })
        .then(response => response.json())
}
