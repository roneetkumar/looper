import axios from 'axios';
import { setAlert } from './alert';
import { PROFILE_ERROR, GET_PROFILE, GET_PROFILES, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_REPOS } from './types';


//GET PROFILE
export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}



//GET All Profile
export const getProfiles = () => async dispatch => {

    dispatch({
        type: CLEAR_PROFILE
    });

    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}



//GET Profile By ID
export const getProfileById = userId => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data[0]
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}




//GET GITHUB Repos
export const getGithubRepos = username => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/github/${username}`);


        dispatch({
            type: GET_REPOS,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}



export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }

    } catch (error) {

        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}



//ADD EXPERIENCE

export const addExperience = (formData, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        history.push('/dashboard');

    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}


//ADD EDUACTION

export const addEducation = (formData, history) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');

    } catch (error) {

        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}


//DELETE EXPERIENCE

export const deleteExperience = id => async dispatch => {

    try {

        const res = axios.delete(`/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });


        dispatch(setAlert('Experience Removed', 'success'));


    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}

//DELETE EDUCATION

export const deleteEducation = id => async dispatch => {
    try {

        const res = axios.delete(`/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));

    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}



//DELETE ACCOUNT AND PROFILE

export const deleteAccount = () => async dispatch => {

    if (window.confirm('Are you sure? This can\'t be undone')) {
        try {

            axios.delete('/api/profile')

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your account has been permanently deleted'));

        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status }
            })
        }
    }
}



