import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/animation/Loading';
import { AuthContext } from './authProvider';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext)
    const location = useLocation()

    if(loading) return <Loading />
    if(user && user?.email){
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;