import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    loading: false,
    profiles: [],
    error: null
}

export const SearchContext = createContext(INITIAL_STATE);


const SearchReducer = (state, action) => {
    switch(action.type) {
        case "SEARCH_START":
            return {
                loading: true,
                profiles: [],
                error: null
            };

        case "SEARCH_SUCCESS":
            return {
                loading: false,
                profiles: action.payload,
                error: null
            };

        case "SEARCH_FAIL":
            return {
                loading: false,
                profiles: [],
                error: action.payload
            }
    }
}

export const SearchContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

    return (
        <SearchContext.Provider value={{ searchDispatch: dispatch, profiles: state.profiles }}>
            { children }
        </SearchContext.Provider>
    )
}