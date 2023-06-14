import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    loading: false,
    user: JSON.parse(localStorage.getItem("user")),
    error: null
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return {
                loading: true,
                user: null,
                error: null
            };

        case "LOGIN_SUCCESS":
            return {
                loading: false,
                user: action.payload,
                error: null
            };

        case "LOGIN_FAIL":
            return {
                loading: false,
                user: null,
                error: action.payload
            };

        case "USER_UPDATE":
            return {
                loading: false,
                user: action.payload,
                error: null,
            }

        case "LOGOUT":
            return {
                loading: false,
                user: null,
                error: null
            }

        default:
            return state
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider value={{ loading: state.loading, user: state.user, err: state.error, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}