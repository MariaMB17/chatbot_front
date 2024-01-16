'use client';
import { FC, useState } from 'react';
import { sessionContext } from './contexts';

interface ContextProps {
    children: React.ReactNode;
}

const SessionProvider: FC<ContextProps> = ({ children }) => {
    const [session, setSession] = useState('');

    return <sessionContext.Provider value={{ session, setSession }} >
        {children}
    </sessionContext.Provider>;
};

export default SessionProvider;