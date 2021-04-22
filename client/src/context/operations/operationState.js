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

const OperationState = props => {
    const initialState = {
        operations: [
            { id: 1, concept: "transporte", amount: "1500", date: "2021-03-25", type: "ingreso" },
            { id: 2, concept: "ropa", amount: "3500", date: "2021-03-30", type: "ingreso" },
            { id: 3, concept: "gimnasio", amount: "2500", date: "2021-03-10", type: "egreso" },
            { id: 4, concept: "helado", amount: "500", date: "2021-03-14", type: "egreso" },
            { id: 5, concept: "futbol", amount: "350", date: "2021-03-23", type: "egreso" },
            { id: 6, concept: "gasolina", amount: "1500", date: "2021-03-31", type: "ingreso" },
        ], 
        userSesion: null,
        operationSelected: null
    }

    const [state, dispatch] = useReducer(OperationReducer, initialState);

    const getOperation = userId => {
        dispatch({
            type: GET_OPERATIONS,
            payload: userId
        })
    }

    const addOperation = operation => {
        
        dispatch({
            type: ADD_OPERATION,
            payload: operation
        })
    }

    const deletOperation = id => {
        dispatch({
            type: DELETE_OPERATION,
            payload: id
        })
    }

    const selectedOperation = operation => {
        dispatch({
            type: SELECTED_OPERATION,
            payload: operation
        })
    }

    const editOperation = operation => {
        dispatch({
            type: EDIT_OPERATION,
            payload: operation
        })
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
                editOperation
                
            }}
        >
            {props.children}
        </OperationContext.Provider>
    )
}

export default OperationState;