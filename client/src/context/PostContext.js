import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    loading: false,
    posts: [],
    error: null
}

export const PostContext = createContext(INITIAL_STATE);

const PostReducer = (state, action) => {
    switch(action.type) {
        case "POSTS_START":
            return {
                loading: true,
                posts: [],
                error: null
            };

        case "POSTS_SUCCESS":
            return {
                loading: false,
                posts: action.payload,
                error: null
            };

        case "POSTS_FAIL":
            return {
                loading: false,
                posts: [],
                error: action.payload
            }

        default:
            return state

    }
}

export const PostContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);

    return (
        <PostContext.Provider value={{ loading: state.loading, err: state.error, posts: state.posts, dispatch }}>
            { children }
        </PostContext.Provider>
    )
}