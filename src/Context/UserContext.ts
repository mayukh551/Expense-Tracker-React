import { createContext } from "react";


export interface UserContextType {
    budget: {
        monthly: number;
        yearly: number;
    };
    age: number;
    salary: number;
    name: string;
    email: string;
    updateBudget: (budget: { monthly: number; yearly: number }) => void;
    updateAge: (age: number) => void;
    updateSalary: (salary: number) => void;
    updateName: (name: string) => void;
    updateEmail: (email: string) => void;
}


const UserContext = createContext<UserContextType>({
    budget: { monthly: 0, yearly: 0 },
    age: 0,
    salary: 0,
    email: '',
    name: 'rounak',
    updateBudget: () => { },
    updateAge: () => { },
    updateSalary: () => { },
    updateName: () => { },
    updateEmail: () => { },

});

export default UserContext;