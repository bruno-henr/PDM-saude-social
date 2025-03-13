import { createContext, useContext, useState } from "react";

interface ContextProps {
    searchQuery: string,
    setSearchQuery: Function
}
const SearchContext = createContext({} as ContextProps);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);