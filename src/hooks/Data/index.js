import { SQLiteProvider } from "expo-sqlite";
import { createContext } from "react";
import { initializeDatabase } from "../../database/initializeDatabase";
import { useState, useContext } from "react";

const DataContext = createContext({});

export function DataProvider({children}) {
    const [data, setData] = useState([false]);
    return <DataContext.Provider value={{ data }}>
        <SQLiteProvider databaseName="data.db" onInit={initializeDatabase}>{children}</SQLiteProvider>
        </DataContext.Provider>
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}