import { useState } from "react";
import * as postService from "../../api/post.service";
import { func } from "prop-types";

const CommentForm = (props) => {

    const [body, setBody] = useState("");

    const handleSubmit = async () => {
        let newComment = { body, user:`${props.currentUser}`}
        let res = await postService.createComment(`${props.post}`, newComment).then(() => {
            setBody("");
            props.refreshPosts();
            console.log(newComment);
        });

        //201 = create error
        if(!res ===201) {
            alert(`ERROR! It was code: ${res.status}`);
        }
    };

    return (
        <div className="container">
            <form className="commentForm">
                    <input 
                        className="commentForm-input"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        type="text"
                        name="body"
                        placeholder="Leave a comment"
                    />
                    <button onClick={handleSubmit} className="comment-btn">Post</button>
            </form>
            
        </div>
    );
};

CommentForm.propTypes = {
refreshPosts : func,

}


export default CommentForm;