import { 
    REG_SUCCESS,
    REG_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SING_OFF,
    GET_USER
} from '../../types/index';

export default (state, action) => {
    switch (action.type) {
        case REG_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_ERROR:
        case REG_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
            }
        default:
            return state;
    }
}