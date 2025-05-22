import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types';

const ProtectedRoutes = ({ children, fallback }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return fallback || <LoadingSpinner/>;
    }

    if (!user) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return children;
};

ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node,
};

ProtectedRoutes.defaultProps = {
    fallback: null,
};

export default ProtectedRoutes;