import React, { useContext, useState } from 'react'
import './search.css'
import { BiSearch } from 'react-icons/bi'
import SearchProfile from '../../components/SearchProfile'
import axios from 'axios'
import { SearchContext } from '../../context/SearchContext'

const Search = () => {

    const [search, setSearch] = useState('');
    const { profiles, searchDispatch } = useContext(SearchContext);

    

    const searchUser = async() => {
        try {

            searchDispatch({ type: "SEARCH_START" });

            const { data } = await axios.post('/api/user/search', {search: search});
            searchDispatch({ type: "SEARCH_SUCCESS", payload: data });

        } catch (error) {
            searchDispatch({ type: "SEARCH_FAILURE" });
        }
    }

    
  return (
    <div className='search_main'>
        <div className='search_bar'>
            <input placeholder='Search' name='search' value={search} onChange={(e) => setSearch(e.target.value)} />
            <BiSearch className='search_icon' onClick={searchUser} />
        </div>

        <div className='search_results'>
            {search !== '' ? <h3>Search results for {search}</h3> : <h3>Search for users</h3>}
            <div className='search_result_profiles'>
                {profiles ? profiles.map((profile) => (
                    <>
                    <SearchProfile key={profile._id} profile={profile} />
                    </>
                )) : (<h4>Loading</h4>)}
            </div>
        </div>
    </div>
  )
}

export default Search