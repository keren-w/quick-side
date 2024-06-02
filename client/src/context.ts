import { createContext } from 'react';

interface IUserContext {
    username: string;
    setUsername: (username: string) => void;
}
export const UserContext = createContext({username: '', setUsername: () => {}} as IUserContext);