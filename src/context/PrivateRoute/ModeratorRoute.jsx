import React from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Forbidden from '../../components/Forbidden/Forbidden';

const ModeratorRoute = ({children}) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    }   

    if (role !== 'Moderator') {
        return <Forbidden></Forbidden>;
    }

    return children;
};

export default ModeratorRoute;