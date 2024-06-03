import React, { createContext, useState } from 'react';

export interface IUser {
        id: string;
        username: string;
        name: {
            title: string;
            first: string;
            last: string;
        };
        email: string;
        picture: string;
        gender: string;
        score: {rounds: number, hits: number};

};

interface IUserContext {
    userData: IUser;
    setUserData: (userData: IUser) => void;
};

const initialUserData: IUser = {
    id: '',
    username: '',
    name: {
        title: '',
        first: '',
        last: '',
    },
    email: '',
    picture: '',
    gender: '',
    score: {rounds: 0, hits: 0},
};

export const UserContext = createContext<IUserContext>({
    userData: initialUserData,
    setUserData: () => {},
});

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<IUser>(initialUserData);
    
    return (
       <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}