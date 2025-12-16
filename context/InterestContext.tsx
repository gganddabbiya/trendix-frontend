'use client';

import { createContext, useContext, ReactNode } from 'react';
import { InterestType } from '@/types/interestType';

interface InterestContextType {
    interestList: InterestType[];
}

const InterestContext = createContext<InterestContextType | undefined>(undefined);

export function InterestProvider({
    children,
    initialInterestList
}: {
    children: ReactNode;
    initialInterestList: InterestType[];
}) {
    return (
        <InterestContext.Provider value={{ interestList: initialInterestList }}>
            {children}
        </InterestContext.Provider>
    );
}

export function useInterestList() {
    const context = useContext(InterestContext);
    if (context === undefined) {
        throw new Error('useInterestList must be used within an InterestProvider');
    }
    return context;
}
