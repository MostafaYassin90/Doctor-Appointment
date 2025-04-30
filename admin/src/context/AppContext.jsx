import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "$";

  // Calculate Age
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob); // mm-dd-yy

    let age = today.getFullYear() - birthDate.getFullYear();
    console.log(dob);
    return age;

  };



  const value = {
    calculateAge: calculateAge,
    currency: currency
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;