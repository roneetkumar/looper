import React from "react";
import PropTypes from 'prop-types';

const ProfileEducation = ({ education: { school, degree, fieldofstudy, to, from, description } }) => {

    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>{from}-{!to ? ' Now' : to}</p>
            <p><strong>Position: </strong>{degree}</p>
            <p><strong>Field of Study: </strong>{fieldofstudy}</p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>
    );
};



ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default ProfileEducation;