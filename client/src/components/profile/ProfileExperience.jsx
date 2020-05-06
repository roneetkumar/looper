import React from "react";
import PropTypes from 'prop-types';

const ProfileExperience = ({ experience: { company, title, to, from, description } }) => {

    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>{from}-{!to ? ' Now' : to}</p>
            <p><strong>Position: </strong>{title}</p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>
    );
};



ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileExperience;