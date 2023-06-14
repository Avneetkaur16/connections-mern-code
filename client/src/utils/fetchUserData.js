import axios from "axios"

export const fetchUserData = async(userId) => {
    try {
        const { data } = await axios.get(`/api/user/${userId}`);
        return ( data )
    } catch (error) {
        console.log(error)
    }
}