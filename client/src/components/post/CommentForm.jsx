import React, { useState } from "react";
import PropTypes from 'prop-types';
import { addComment } from "../../actions/post";
import { connect } from "react-redux";

const CommentForm = ({ postId, addComment }) => {

    const [text, setText] = useState('')

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                addComment(postId, { text });
                setText('');
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Comment on this post"
                    value={text}
                    required
                    onChange={e => setText(e.target.value)}
                ></textarea>
                <input type="submit" className="btn btn-secondary my-1" style={{ color: "#fff" }} value="Submit" />
            </form>
        </div>
    );
};



CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm);
