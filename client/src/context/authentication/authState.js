import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { 
    REG_SUCCESS,
    REG_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SING_OFF,
    GET_USER
} from '../../types/index';

const AuthState = props => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const regUser = async data => {
        try {
            const response = await clientAxios.post('/api/users', data);
            //console.log(response)

            dispatch({
                type: REG_SUCCESS,
                payload: response.data,
            });

            userAuth();

        } catch (error) {
            console.log(error);

            dispatch({
                type: REG_ERROR
            })
        }
    }

    const userAuth = async () => {
        const token = localStorage.getItem('token');

        if(token) {
            tokenAuth(token);
        }

        try {
            const response = await clientAxios.get('/api/auth');
            //console.log(response)
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR,                
            })
        }
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                regUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;