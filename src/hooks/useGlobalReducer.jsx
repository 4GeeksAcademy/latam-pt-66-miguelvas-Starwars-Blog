// src/hooks/useGlobalReducer.jsx
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

// El contexto para compartir el estado global
const StoreContext = createContext();

export function StoreProvider({ children }) {
    // Inicializamos el reducer con el estado inicial
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

// Hook personalizado para acceder fácilmente a store y dispatch
export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    
    if (!context) {
        throw new Error("useGlobalReducer debe ser usado dentro de un StoreProvider");
    }
    
    return context;
}