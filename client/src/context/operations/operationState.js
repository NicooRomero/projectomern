import React, { useReducer } from 'react';
import OperationContext from './operationContext';
import OperationReducer from './operationReducer';

import {
    ADD_OPERATION,
    DELETE_OPERATION,
    GET_OPERATIONS,
    SELECTED_OPERATION,
    EDIT_OPERATION
} from '../../types/index';

import clientAxios from '../../config/axios';

const OperationState = props => {
    const initialState = {
        operations: [], 
        userSesion: null,
        operationSelected: null
    }

    const [state, dispatch] = useReducer(OperationReducer, initialState);

    const getOperation = async () => {
        
        try {
            const response = await clientAxios.get('/api/transactions');
            dispatch({
                type: GET_OPERATIONS,
                payload: response.data.transactions
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addOperation = async operation => {
        
        try {
            const response = await clientAxios.post('/api/transactions', operation);
            dispatch({
                type: ADD_OPERATION,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
            
        }
        
    }

    const deletOperation = async id => {
        
        try {
            await clientAxios.delete(`/api/transactions/${id}`);

            dispatch({
                type: DELETE_OPERATION,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    const selectedOperation = operation => {
        dispatch({
            type: SELECTED_OPERATION,
            payload: operation
        })
    }

    const editOperation = async operation => {
        
        try {
            const response = await clientAxios.put(`/api/transactions/${operation._id}`, operation);
            dispatch({
                type: EDIT_OPERATION,
                payload: response.data.transaction
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <OperationContext.Provider
            value={{
                operations: state.operations,
                userSesion: state.userSesion, 
                operationSelected: state.operationSelected, 
                addOperation,
                deletOperation,
                selectedOperation,
                editOperation,
                getOperation
                
            }}
        >
            {props.children}
        </OperationContext.Provider>
    )
}

export default OperationState;