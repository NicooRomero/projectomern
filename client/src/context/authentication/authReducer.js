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
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                msg: null,
                load: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                load: false
            }
        case SING_OFF:
        case LOGIN_ERROR:
        case REG_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                msg: action.payload,
                user: null,
                authenticated: null,
                load: false
            }
        default:
            return state;
    }
}