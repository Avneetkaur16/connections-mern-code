import { useReducer } from "react";
import { createContext } from "react"

const INITIAL_STATE = {
    loading: false,
    followers: []
}

export const FollowerContext = createContext(INITIAL_STATE);

const FollowerReducer = (state, action) => {
    switch(action.type) {
        case "LOAD_FOLLOWERS":
            return {
                loading: true,
                followers: []
            };
        case "SET_FOLLOWERS":
            return {
                loading: false,
                followers: action.payload
            }
        default:
            return state;
    }

}

export const FollowerContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FollowerReducer, INITIAL_STATE);

    return(
        <FollowerContext.Provider value={{ followerDispatch: dispatch, followers: state.followers, followersLoading: state.loading }}>
            { children }
        </FollowerContext.Provider>
    )
}