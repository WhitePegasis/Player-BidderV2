import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const playersUrl = 'http://localhost:8080';

export const getPlayers = async (id) => {
    id = id || '';
    return await axios.get(`${playersUrl}/${id}`);
}

export const getEligiblePlayers = async () => {
    return await axios.get(`${playersUrl}/eligible`);
}

export const addPlayer = async (player) => {
    try {
        return await axios.post(`${playersUrl}/add`, player);    
    } catch (error) {
        console.log('Error while calling addPlayer api: ' , error);
    }
    
}

export const deletePlayer = async (id) => {
    return await axios.delete(`${playersUrl}/${id}`);
}

export const editPlayer = async (id, player) => {
    return await axios.put(`${playersUrl}/${id}`, player)
}

export const getTeams = async (id) => {
    id = id || '';
    return await axios.get(`${playersUrl}/allTeams`);
    // return await axios.get(`${playersUrl}/allTeams/${id}`);
}

export const addTeam = async (team) => {
    try {
        return await axios.post(`${playersUrl}/addTeam`, team);    
    } catch (error) {
        console.log('Error while calling addPlayer api: ' , error);
    }
    
}

export const editTeam =  async(id, team)=>{
    return await axios.put(`${playersUrl}/editTeam/${id}`, team)
}