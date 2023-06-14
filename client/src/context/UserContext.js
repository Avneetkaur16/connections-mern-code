import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    loading: false,
    user: null,
    error: null
}

export const UserContext = createContext(INITIAL_STATE);

const UserReducer = (state, action) => {
    switch(action.type) {
        case "USER_START":
            return {
                loading: true,
                user: null,
                error: null
            };

        case "USER_SUCCESS":
            return {
                loading: false,
                user: action.payload,
                error: null
            };

        case "USER_FAIL":
            return {
                loading: false,
                user: null,
                error: action.payload
            };

        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    return (
        <UserContext.Provider value={{ loading: state.loading, err: state.error, userProfile: state.user, userDispatch: dispatch }}>
            { children }
        </UserContext.Provider>
    )
}