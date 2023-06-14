import { useReducer } from "react";
import { createContext } from "react"

const INITIAL_STATE = {
    loading: false,
    followings: []
}

export const FollowingContext = createContext(INITIAL_STATE);


const FollowingReducer = (state, action) => {
    switch(action.type) {
        case "LOAD_FOLLOWINGS": 
            return {
                loading: true,
                followings: []
            };
        
        case "SET_FOLLOWING":
            return {
                loading: false,
                followings: action.payload
            };

        default:
            return state;
    }
}

export const FollowingContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FollowingReducer, INITIAL_STATE);

    return (
        <FollowingContext.Provider value={{ followingDispatch: dispatch, followings: state.followings, followingsLoading: state.loading }}>
            { children }
        </FollowingContext.Provider>
    )
}