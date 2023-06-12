import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostDetails, updatePostDetails } from "../managers/PostManager"

export const UpdatePostForm = () => {
    const navigate = useNavigate()
    const { postId } = useParams()
    const [post, setPost] = useState({
        image_url: "",
        caption: ""
    })

    useEffect(
        () => {
            getPostDetails(postId)
                .then((postData) => {
                    const postObject = postData
                    postObject.image_url = postData.image_url
                    postObject.caption = postData.caption
                    setPost(postObject)
                })
        },
        [postId]
    )

    const changePostState = (domEvent) => {
        const copy = {...post}
        copy[domEvent.target.name] = domEvent.target.value
        setPost(copy)
        }

    return <>
    <h1 className="update_posts_header">Edit Post</h1>
    <form className="post_form">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Post Image:</label>
                    <div className="input__field">
                        <input
                            name="image_url"
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={post.image_url}
                            onChange={changePostState} />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="caption">Caption:</label>
                    <div className="input__field">
                        <textarea
                            name="caption"
                            required autoFocus
                            type="text"
                            className="form-control-caption"
                            value={post.caption}
                            onChange={changePostState} />
                    </div>
                </div>
            </fieldset>

        <button className="btn btn-save"
        onClick={evt => {
            evt.preventDefault()
            
            const updatedPost = {
                id: postId,
                image_url: post.image_url,
                caption: post.caption
            }

            updatePostDetails(updatedPost)
            .then(() => window.alert("Your post has been updated")).then(() => navigate("/"))}}>
            Save
        </button>
    </form>
</>
}
