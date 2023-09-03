import { useState } from "react";
import UserContext from "./UserContext";

import { UserContextType } from "./UserContext";


export const UserState: React.FC<{ children: React.ReactNode }> = (props) => {
  const [budget, setBudget] = useState({ monthly: 0, yearly: 0 });
  const [age, setAge] = useState(0);
  const [salary, setSalary] = useState(0);
  const [name, setName] = useState("rounak");
  const [email, setEmail] = useState("");

  const updateBudget = (newBudget: { monthly: number; yearly: number }) =>
    setBudget({ monthly: newBudget.monthly, yearly: newBudget.yearly });

  const updateAge = (newAge: number) => {
    console.log(newAge);
    setAge(newAge);
  };

  const updateSalary = (newSalary: number) => setSalary(newSalary);

  const updateName = (newName: string) => {setName(newName);console.log(name)};

  const updateEmail = (newEmail: string) => {
    setEmail(newEmail);
    console.log("email");
    console.log(email);
  };



  const contextValue: UserContextType = {
    budget,
    age,
    salary,
    name,
    email,
    updateBudget,
    updateAge,
    updateSalary,
    updateName,
    updateEmail
}

return (
  <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>
);

};

