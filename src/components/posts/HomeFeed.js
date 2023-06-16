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

export const HomeFeed = () => {
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [ filterBySearch, setFilterBySearch ] = useState()
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
        <h3>League News</h3>
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