import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/login" />) : (<Component {...props} />)} />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    auth: state.auth
})



export default connect(mapStateToProps, { login })(PrivateRoute);

