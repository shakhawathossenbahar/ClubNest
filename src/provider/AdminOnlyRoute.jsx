import React, { useContext } from 'react';
import { AuthContext } from './authProvider';
import useRole from '../hooks/useRole';
import Loading from '../components/animation/Loading';
import Forbidden from '../components/Forbidden';

const AdminOnlyRoute = ({children}) => {

    const {loading} = useContext(AuthContext)
    const {role,isLoading} = useRole()

    if(loading || isLoading){
        return <Loading />
    }

    if(role !== 'admin'){
        return  <Forbidden />
    }


    return children
};

export default AdminOnlyRoute;