'use client';
import { createContext, useContext, useState } from 'react';

const SessionContext = createContext<any>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    let [session, setSession] = useState();

    return <SessionContext.Provider value={{ session, setSession }} >
        {children}
    </SessionContext.Provider>;
};

export function useSessionContext() {
    const context = useContext(SessionContext)
    if (!context) throw new Error('debe usarse dentro de un provider')
    return context
};
