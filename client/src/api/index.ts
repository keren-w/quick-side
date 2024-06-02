const urlWithProxy = '/api/v1';
import axios from "axios";

export const login = async (username: string) => {
    const response = await axios.post(`${urlWithProxy}/users/login`, { username });
    return response.data;
};

export const updateUserScore = async (username: string, score: number) => {
    const response = await axios.post(`${urlWithProxy}/update-score`, { username, score });
    return response.data;
};

export const getLeaderboard = async () => {
    const response = await axios.get(`${urlWithProxy}/leaderboard`);
    return response.data;
};