import { useNavigate } from "react-router-dom"
import "./Posts.css"
import { useState } from "react"
import { createPost } from "../managers/PostManager"

export const PostForm = () => {
    const navigate = useNavigate()
    const [post, updateNewPost] = useState({
        imageURL: "",
        caption: ""
    })

    const submissionButton = (event) => {
        event.preventDefault()

        const postToSendToAPI = {
            image_url: post.imageURL,
            caption: post.caption
        }

        return createPost(postToSendToAPI)
            .then(() => {
                alert("Your post was successful!")
                navigate("/")
            })
    }

    return <>
    <h1 className="create_posts_header">Post Form</h1>
    <form className="post_form">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Post Image:</label>
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
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
                    <label htmlFor="caption">Caption:</label>
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
                className="btn-submit"><b>
                    Submit
                </b></button>
        </form>
    </>
}