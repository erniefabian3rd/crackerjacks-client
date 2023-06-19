import { useEffect, useState } from "react"
import "./Posts.css"
import { deletePost, filterPostsBySearch, getPosts, likePost, unlikePost } from "../managers/PostManager"
import filled_heart from "../../images/filled-heart.png"
import heart from "../../images/heart.png"
import comment from "../../images/comment.png"
import message from "../../images/message.png"
import trashcan from "../../images/trashcan.png"
import gear from "../../images/gear.png"
import { useNavigate } from "react-router-dom"
import { getMLBTeams, getTodaysGames } from "../managers/GameManager"
import { getLeagueNews } from "../managers/NewsManager"

export const HomeFeed = () => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [ filterBySearch, setFilterBySearch ] = useState()
    const [sortedGames, setSortedGames] = useState([])
    const [MLBTeams, setMLBTeams] = useState({})
    const [newsArticle, setNews] = useState([])
    const navigate = useNavigate()

    const getAllPosts = () => {
        getPosts()
            .then((postsData) => {
            const sortedData = postsData.sort((a, b) => new Date(b.published_date) - new Date(a.published_date))
            setPosts(sortedData)
            setFilteredPosts(sortedData)
        })
    }

    useEffect(
        () => {
            getAllPosts()
        }, []
    )

    useEffect(() => {
        getTodaysGames()
            .then((todaysGameData) => {
                if (todaysGameData.body) {
                    const sortedGames = Object.entries(todaysGameData.body).sort(([, a], [, b]) => {
                        if (a.gameStatus < b.gameStatus) {
                            return 1
                        }
                        if (a.gameStatus > b.gameStatus) {
                            return -1
                        }
                        return 0
                    })
                    setSortedGames(sortedGames)
                }
            })
    }, []
    )

    useEffect(() => {
        getMLBTeams()
            .then((teamData) => {
                setMLBTeams(teamData)
            })
    }, []
    )

    useEffect(() => {
        getLeagueNews()
            .then((newsData) => {
                setNews(newsData)
            })
    }, []
    )


    const getTeamLogo = (teamID) => {
        const teams = MLBTeams.body.find((team) => team.teamID === teamID)
        let teamLogo = ""

        if (teams) {
        teamLogo = teams.mlbLogo1
        }
        return teamLogo
    }

    const getTeamRecord = (teamID) => {
        const teams = MLBTeams.body.find((team) => team.teamID === teamID)
        let teamRecord = ""

        if (teams) {
            teamRecord = `${teams.wins}-${teams.loss}`
        }
        return teamRecord
    }


    const handleLike = (postId) => {
        likePost(postId)
        .then(() => {
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                post.id === postId ? { ...post, is_liked: true } : post
            )
        )
        })
    }

    const handleUnlike = (postId) => {
        unlikePost(postId)
        .then(() => {
            setPosts((prevPosts) =>
            prevPosts.map((post) =>
            post.id === postId ? { ...post, is_liked: false } : post
            )
        )
        })
    }

    const handleDeletePost = (postId) => {
        deletePost(postId)
            .then(() => {
                window.confirm(`Are you sure you want to delete post?`)
                getAllPosts()
            })
    }

    useEffect(() => {
        if (filterBySearch) {
            filterPostsBySearch(filterBySearch).then((filteredData) => {
            const updatedData = filteredData.map((filteredPost) => {
            const originalPost = posts.find((post) => post.id === filteredPost.id)
                if (originalPost) {
                filteredPost.is_liked = originalPost.is_liked
                filteredPost.may_edit_or_delete = originalPost.may_edit_or_delete
                }
                return filteredPost
            })
            setFilteredPosts(updatedData)
        })
        } else {
            setFilteredPosts(posts)
        }
    }, [filterBySearch, posts]
    )

    return <>
    <section className="league_info_container" id="fixed-content">
        <h3>League Scores</h3>
        <div className="todays_games_container scrollable-box">
        {sortedGames && sortedGames.map(([key, todaysGame]) => (
        <div key={key} className="todays_games">
            <div>{todaysGame.currentInning}</div>
            <div className="teams_playing">
            {todaysGame.gameStatus === "Not Started Yet"
            ? <p className="start_time">{todaysGame.gameTime}</p>
            : ""
            }
                <div className="away_team">
                    <img className="team_logo" src={getTeamLogo(todaysGame.teamIDAway)} alt="Team Logo" />
                    <p className="away_name">{todaysGame.away} {todaysGame.lineScore?.away.R}</p>
                    {todaysGame.gameStatus === "Not Started Yet"
                    ? <p className="away_record">{getTeamRecord(todaysGame.teamIDAway)}</p>
                    : ""
                    }
                </div>
                <div className="home_team">
                    <img className="team_logo" src={getTeamLogo(todaysGame.teamIDHome)} alt="Team Logo" />
                    <p className="home_name">{todaysGame.home} {todaysGame.lineScore?.home.R}</p>
                    {todaysGame.gameStatus === "Not Started Yet"
                    ? <p className="home_record">{getTeamRecord(todaysGame.teamIDHome)}</p>
                    : ""
                    }
                </div>
            </div>
        </div>
        ))}
        </div>
        <h3>League News</h3>
        <div className="league_news_container scrollable-box">
        {newsArticle.map((news) => {
            return <div key={news.id}>
                <a className="article_link" href={news.link_url} target="_blank">
                    <h4 className="article_title">{news.title}</h4>
                </a>
                <p>{news.article}</p>
                <p>{news.published_date}</p>
            </div>
        })
        }
        </div>
    </section>

    <section className="posts_container" id="scrollable-content">
        <h1 className="posts_header">Posts</h1>
        <section className="posts_action_items">
            <input type="text"
                className="post_search_box"
                placeholder="Search posts..."
                onChange={(changeEvent) => {
                    setFilterBySearch(changeEvent.target.value)
                }} />
            <button className="create_post_btn" onClick={() => navigate(`/posts/create`)}>Create a Post</button>
        </section>
    {
        filteredPosts.map((post) => {
            return (
                <div className="posts_info" key={`posts--${post.id}`}>
                    <div className="image_container">
                        <img className="posts_profile_image" src={post.author.profile_image_url} alt="Profile Image" />
                        <img className="posts_image" src={post.image_url} alt="Post Image" onDoubleClick={() => {post.is_liked ? handleUnlike(post.id) : handleLike(post.id)}}/>
                    </div>
                    <div className="posts_text_container">
                        <div className="action_container">
                            <h3 className="posts_username" onClick={() => navigate(`/profile/${post.author.id}`)}>{post.author.user.username}</h3>
                            <div className="action_icons">
                                {post.is_liked
                                ? <img className="heart_icon" src={filled_heart} onClick={() => handleUnlike(post.id)}></img>
                                : <img className="heart_icon" src={heart} onClick={() => handleLike(post.id)}></img>
                                }
                                <img className="comment_icon" src={comment} onClick={() => navigate(`/posts/${post.id}`)}></img>
                                <img className="message_icon" src={message}></img>
                                {post.may_edit_or_delete ? (<>
                                <img className="gear_icon" src={gear} onClick={() => navigate(`posts/${post.id}/edit`)}/>
                                <img className="trashcan_icon" src={trashcan} onClick={() => handleDeletePost(post.id)}/>
                                </>) : ""}
                            </div>
                        </div>
                        <p className="posts_caption">{post.caption}</p>
                    </div>
                </div>
            )
        })
    }
    </section>

    </>
}