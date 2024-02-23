import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const stored = JSON.parse(localStorage.getItem("data"));
  //   console.log(stored);
  const initialState = stored === null ? [] : [...stored];
  const [data, setData] = useState(initialState);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
