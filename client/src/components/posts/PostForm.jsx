import React, { useState } from "react";
import PropTypes from 'prop-types';
import { addPost } from "../../actions/post";
import { connect } from "react-redux";

const PostForm = ({ addPost }) => {

    const [text, setText] = useState('');

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                addPost({ text });
                setText('');
            }}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    required
                    onChange={e => setText(e.target.value)}
                ></textarea>
                <input type="submit" className="btn btn-secondary my-1" value="Submit" style={{ color: "#fff" }} />
            </form>
        </div>

    );
};



PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm);
