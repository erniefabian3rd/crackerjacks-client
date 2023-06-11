import { useEffect, useState } from "react"
import "./Posts.css"
import { getPosts } from "../managers/PostManager"
import heart from "../../images/heart.png"
import comment from "../../images/comment.png"
import message from "../../images/message.png"
import trashcan from "../../images/trashcan.png"

export const HomeFeed = () => {
    const [posts, setPosts] = useState([])

    useEffect(
        () => {
            getPosts()
                .then((postsData) => setPosts(postsData))
        }, []
    )

    return <>
    <section className="league_info_container" id="fixed-content">
        <h3>League Scores</h3>
        <h3>League News</h3>
    </section>
    <section className="posts_container" id="scrollable-content">
    {
        posts.map((post) => {
            return (
                <div className="posts_info">
                    <div className="image_container">
                        <img className="posts_profile_image" src={post.author.profile_image_url} alt="Profile Image" />
                        <img className="posts_image" src={post.image_url} alt="Post Image" />
                    </div>
                    <div className="posts_text_container">
                        <div className="action_container">
                            <h3 className="posts_username">{post.author.user.username}</h3>
                            <div className="action_icons">
                                <img className="heart_icon" src={heart}></img>
                                <img className="comment_icon" src={comment}></img>
                                <img className="message_icon" src={message}></img>
                                <img className="trashcan_icon" src={trashcan}></img>
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