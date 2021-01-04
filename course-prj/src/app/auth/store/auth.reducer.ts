import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
    user: User,
    authError: string,
    loading: boolean
}

const initialState = {
    user: null,
    authError: null,
    loading : false
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
    switch(action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            console.log('reducer-auth success - email:' + action.payload.email);
            const user = new User(
                    action.payload.email, 
                    action.payload.userId, 
                    action.payload.token, 
                    action.payload.expirationDate
                );
            return {
                ...state,
                user: user,
                authError: null,
                loading: false
            };
        case AuthActions.LOGOUT: 
            return {
                ...state,
                user: null,
                // loading: false,
                // authError: null
            };
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                // user: null,
                authError: null,
                loading: true
            }
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError:  action.payload,
                loading: false
            };
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }

        default:
            return state;
    }
}