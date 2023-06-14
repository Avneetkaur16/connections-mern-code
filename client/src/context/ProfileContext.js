import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    loading: false,
    profilePosts: [],
    error: null
}

export const ProfileContext = createContext(INITIAL_STATE);

const ProfileReducer = (state, action) => {
    switch(action.type) {
        case "PROFILE_START":
            return {
                loading: true,
                profilePosts: [],
                error: null
            };

        case "PROFILE_SUCCESS":
            return {
                loading: false,
                profilePosts: action.payload,
                error: null
            };

        case "PROFILE_FAIL":
            return {
                loading: false,
                profilePosts: [],
                error: null
            }
    }
}

export const ProfileContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProfileReducer, INITIAL_STATE);

    return (
        <ProfileContext.Provider value={{ loading: state.loading, profilePosts: state.profilePosts, err: state.error, dispatch }}>
            { children }
        </ProfileContext.Provider>
    )
}