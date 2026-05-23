import React, { useContext } from 'react';
import { AuthContext } from './authProvider';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden';
import Loading from '../components/animation/Loading';


const ClubManagerOnlyRoute = ({children}) => {

    const {loading} = useContext(AuthContext)
    const {role,isLoading} = useRole()

    if(loading || isLoading){
        return <Loading />
    }

    if(role !== 'Club-Manager'){
        return <Forbidden /> 
    }


    return children
};

export default ClubManagerOnlyRoute;