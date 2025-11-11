import { createContext, useState, useEffect } from "react";

export const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || "farmer");
  const [batches, setBatches] = useState(JSON.parse(localStorage.getItem("batches")) || []);
  const [feeds, setFeeds] = useState(JSON.parse(localStorage.getItem("feeds")) || []);
  const [vaccinations, setVaccinations] = useState(JSON.parse(localStorage.getItem("vaccinations")) || []);
  const [sales, setSales] = useState(JSON.parse(localStorage.getItem("sales")) || []);
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem("expenses")) || []);

  useEffect(() => {
    localStorage.setItem("role", role);
    localStorage.setItem("batches", JSON.stringify(batches));
    localStorage.setItem("feeds", JSON.stringify(feeds));
    localStorage.setItem("vaccinations", JSON.stringify(vaccinations));
    localStorage.setItem("sales", JSON.stringify(sales));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [role, batches, feeds, vaccinations, sales, expenses]);

  return (
    <FarmContext.Provider value={{
      role, setRole,
      batches, setBatches,
      feeds, setFeeds,
      vaccinations, setVaccinations,
      sales, setSales,
      expenses, setExpenses,
    }}>
      {children}
    </FarmContext.Provider>
  );
};
