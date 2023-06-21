import { useEffect, useState } from "react"
import "./Posts.css"
import { createPost, deletePost, filterPostsBySearch, getPosts, likePost, unlikePost } from "../managers/PostManager"
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
    const [showCreateForm, setShowCreateForm] = useState(false)
    const navigate = useNavigate()
    const [post, updateNewPost] = useState({
        imageURL: "",
        caption: ""
    })

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
                        if (a.gameStatus > b.gameStatus) {
                            return 1
                        }
                        if (a.gameStatus < b.gameStatus) {
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
        if (MLBTeams.body) {
        const teams = MLBTeams.body.find((team) => team.teamID === teamID)
        let teamLogo = ""

        if (teams) {
        teamLogo = teams.mlbLogo1
        }
    
        return teamLogo
    }}

    const getTeamRecord = (teamID) => {
        if (MLBTeams.body) {
        const teams = MLBTeams.body.find((team) => team.teamID === teamID)
        let teamRecord = ""

        if (teams) {
            teamRecord = `${teams.wins}-${teams.loss}`
        }
        return teamRecord
    }}


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

    const submissionButton = (event) => {
        event.preventDefault()

        const postToSendToAPI = {
            image_url: post.imageURL,
            caption: post.caption
        }

        return createPost(postToSendToAPI)
            .then(() => {
                alert("Your post was successful!")
                getAllPosts()
                setShowCreateForm(false)
                updateNewPost({ imageURL: "", caption: "" })
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

    const handleCreatePost = () => {
        if (!showCreateForm) {
            updateNewPost({ imageURL: "", caption: "" });
        }
        setShowCreateForm(!showCreateForm)
    }

    return <>
    <section className="league_info_container" id="fixed-content">
        <h3 className="scores_header">League Scores</h3>
        <div className="todays_games_container scrollable-box">
        {sortedGames && sortedGames.map(([key, todaysGame]) => (
        <div key={key} className="todays_games">
            <div className="teams_playing">
            {todaysGame.gameStatus === "Not Started Yet"
            ? <>
            <p className="start_time">{todaysGame.gameTime}</p>
            <section className="teams_container">
                <div className="away_team">
                    <img className="team_logo" src={getTeamLogo(todaysGame.teamIDAway)} alt="Team Logo" />
                    <p className="away_name">{todaysGame.away}</p>
                    <p className="away_record">{getTeamRecord(todaysGame.teamIDAway)}</p>
                </div>
                <div className="home_team">
                    <img className="team_logo" src={getTeamLogo(todaysGame.teamIDHome)} alt="Team Logo" />
                    <p className="home_name">{todaysGame.home}</p>
                    <p className="home_record">{getTeamRecord(todaysGame.teamIDHome)}</p>
                </div>
            </section>
            </>
            : <>
            <p className="current_inning">{todaysGame.currentInning}</p>
            <section className="teams_container_live">
                <div className="away_team_live">
                    <div className="logo_and_name">
                        <img className="team_logo" src={getTeamLogo(todaysGame.teamIDAway)} alt="Team Logo" />
                        <p className="away_name">{todaysGame.away}</p>
                    </div>
                    <div className="just_score">
                        <p className="away_score">{todaysGame.lineScore?.away.R}</p>
                    </div>
                </div>
                <div className="home_team_live">
                    <div className="logo_and_name">
                        <img className="team_logo" src={getTeamLogo(todaysGame.teamIDHome)} alt="Team Logo" />
                        <p className="home_name">{todaysGame.home}</p>
                    </div>
                    <div className="just_score">
                        <p className="home_score">{todaysGame.lineScore?.home.R}</p>
                    </div>
                </div>
                {todaysGame.gameStatus === "Live - In Progress"
                ? <>
                <p className="current_count">{todaysGame.currentCount}</p>
                <p className="current_outs">{todaysGame.currentOuts} Outs</p>
                </>
                : ""
                }
            </section>
            </>
            }
            </div>
        </div>
        ))}
        </div>
        <h3 className="news_header">League News</h3>
        <div className="scrollable-box">
        {newsArticle.map((news) => {
            return <div className="league_news_container" key={news.id}>
                <a className="article_link" href={news.link_url} target="_blank">
                    <h4 className="article_title">{news.title}</h4>
                </a>
                <p className="article_text">{news.article}</p>
                <p className="article_date">Published: {news.published_date}</p>
            </div>
        })
        }
        </div>
    </section>

    <section className="posts_container" id="scrollable-content">
        <section className="posts_action_items">
            <input type="text"
                className="post_search_box"
                placeholder="Search posts..."
                onChange={(changeEvent) => {
                    setFilterBySearch(changeEvent.target.value)
                }} />
            <button className="create_post_btn" onClick={() => handleCreatePost()}>
                {showCreateForm ? "-" : "+"}
            </button>
        </section>
        {showCreateForm && (
            <div className="create_post_form">
            <form className="post_form">
            <fieldset>
                <div className="form-group">
                    <div className="image_ip">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control-image"
                            placeholder="Image URL"
                            value={post.imageURL}
                            onChange={
                                (evt) => {
                                    const newPost = { ...post }
                                    newPost.imageURL = evt.target.value
                                    updateNewPost(newPost)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <textarea
                            required autoFocus
                            type="text"
                            className="form-control-caption"
                            placeholder="What's on your mind?"
                            value={post.caption}
                            onChange={
                                (evt) => {
                                    const newPost = { ...post }
                                    newPost.caption = evt.target.value
                                    updateNewPost(newPost)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => {
                    submissionButton(clickEvent)}}
                className="new_post_submit_btn"><b>
                    Submit
                </b></button>
        </form>
        </div>)}

    {
        filteredPosts.map((post) => {
            return (
                <div className="posts_info" key={`posts--${post.id}`}>
                    <div className="image_container">
                        <img className="posts_profile_image" src={post.author.profile_image_url} alt="Profile Image" onClick={() => navigate(`/profile/${post.author.id}`)}/>
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