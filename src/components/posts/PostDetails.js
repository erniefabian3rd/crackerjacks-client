import { useEffect, useState } from "react"
import "./Posts.css"
import { useNavigate, useParams } from "react-router-dom"
import { getPostDetails, deletePost, likePost, unlikePost } from "../managers/PostManager"
import filled_heart from "../../images/filled-heart.png"
import heart from "../../images/heart.png"
import commentbubble from "../../images/comment.png"
import message from "../../images/message.png"
import trashcan from "../../images/trashcan.png"
import gear from "../../images/gear.png"
import { createComment, getFilteredComments } from "../managers/CommentManager"

export const PostDetails = () => {
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const { postId } = useParams()
    const navigate = useNavigate()
    const [comment, updateNewComment] = useState({
        comment: "",
        post: "",
        author: ""
    })

    const getAllFilteredComments = () => {
        getFilteredComments(postId)
                .then(commentData => setComments(commentData))
    }

    const getSelectedPostDetails = () => {
        getPostDetails(postId)
        .then((postData) => setPost(postData))
    }

    useEffect(
        () => {
            getSelectedPostDetails()
        },
        [postId]
    )

    useEffect(
        () => {
            getAllFilteredComments()
        },
        [postId]
    )

    const handleDeletePost = (postId) => {
        deletePost(postId)
            .then(() => {
                window.confirm(`Are you sure you want to delete post?`)
                navigate('/')
            })
    }

    const submissionButton = (event) => {
        event.preventDefault();

        const commentToSendToAPI = {
            comment: comment.comment,
            post: parseInt(postId),
            author: parseInt(comment.author.id)
        }

        createComment(commentToSendToAPI)
            .then(() => {
                getAllFilteredComments()
                alert("Your comment was successful!")
                updateNewComment((prevComment) => ({
                ...prevComment,
                comment: ""
            }))
        })
    }

    const handleLike = (postId) => {
        likePost(postId)
            .then(() => {
                getSelectedPostDetails()
            })
    }

    const handleUnlike = (postId) => {
        unlikePost(postId)
            .then(() => {
                getSelectedPostDetails()
            })
    }


    return <>
    <h1 className="post_details_header">Post Details</h1>
    <section className="post_details_container">
        <div className="image_container">
            <img className="posts_profile_image" src={post.author?.profile_image_url} alt="Profile Image" />
            <img className="posts_image" src={post.image_url} alt="Post Image" onClick={() => navigate(`/posts/${post.id}`)}/>
        </div>
        <div className="posts_text_container">
            <div className="action_container">
                <h3 className="posts_username" onClick={() => navigate(`/profile/${post.author.id}`)}>{post.author?.user.username}</h3>
                <p className="post_like_count">Likes: {post.like_count}</p>
                <div className="action_icons">
                    {post.is_liked
                    ? <img className="heart_icon" src={filled_heart} onClick={() => handleUnlike(post.id)}></img>
                    : <img className="heart_icon" src={heart} onClick={() => handleLike(post.id)}></img>
                    }
                    <img className="comment_icon" src={commentbubble}></img>
                    <img className="message_icon" src={message}></img>
                    {post.may_edit_or_delete ? (<>
                    <img className="gear_icon" src={gear} onClick={() => navigate(`posts/${post.id}/edit`)}/>
                    <img className="trashcan_icon" src={trashcan} onClick={() => handleDeletePost(post.id)}/>
                    </>) : ""}
                </div>
            </div>
            <p className="posts_caption">{post.caption}</p>
            <section className="comments_container">
            {
            comments.map((comment) => {
            return (
                <div className="comments_info" key={`comments--${comment.id}`}>
                    <h4 className="comments_author" onClick={() => navigate(`/profile/${comment.author.id}`)}>{comment.author?.user?.username}</h4>
                    <p className="comments_message">{comment.comment}</p>
                </div>
                    )
                })
            }
            </section>
            <div className="new_comment_container">
                <textarea
                    type="text"
                    className="post_comment_box"
                    placeholder="Write a comment..."
                    value={comment.comment}
                    onChange={
                        (evt) => {
                            const newComment = { ...comment }
                            newComment.comment = evt.target.value
                            updateNewComment(newComment)
                        }
                    } />
                <button
                    onClick={(clickEvent) => {
                        submissionButton(clickEvent)}}
                    className="btn-submit">Send</button>
            </div>
        </div>
    </section>
    </>
}