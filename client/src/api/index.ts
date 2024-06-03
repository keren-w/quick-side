const urlWithProxy = '/api/v1';
import axios from "axios";
import { IUser } from "../context";

export const login = async (username: string) => {
    const response = await axios.post(`${urlWithProxy}/users/login`, { username });
    return response.data;
};

export const updateUserScore = async (userId: string, score: {rounds: number, hits: number}) => {
    const response = await axios.patch(`${urlWithProxy}/users/${userId}/score`, {score});
    return response.data;
};

export const getLeaderboard = async () => {
    const response = await axios.get(`${urlWithProxy}/users/`);
    console.log(response.data.map((user: IUser) => `Username: ${user.username}, Name: ${user.name?.first}, User Score: ${user.score.hits} hits / ${user.score.rounds} rounds`,));
};